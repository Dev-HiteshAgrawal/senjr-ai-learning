/**
 * Admin User Seeding Utility for SENJR
 *
 * Creates a Firebase Auth user and sets their Firestore record to admin role.
 *
 * Usage:
 *   npx tsx scripts/seed-admin.ts --email admin@senjr.app --password securePass123 --name "Admin User"
 *
 * Environment variables (from .env or loaded by Vite):
 *   VITE_FIREBASE_API_KEY
 *   VITE_FIREBASE_PROJECT_ID
 *
 * Or use --api-key and --project-id flags.
 */

async function seedAdmin() {
  const args = parseArgs()
  const apiKey = args['api-key'] || process.env.VITE_FIREBASE_API_KEY
  const projectId = args['project-id'] || process.env.VITE_FIREBASE_PROJECT_ID
  const email = args.email
  const password = args.password
  const displayName = args.name || 'Admin'

  if (!apiKey || !projectId || !email || !password) {
    console.error(`
Usage: npx tsx scripts/seed-admin.ts [options]

Required:
  --email <email>          Admin email address
  --password <password>    Admin password (min 6 chars)

Optional:
  --name <displayName>     Display name (default: Admin)
  --api-key <key>          Firebase Web API key (or VITE_FIREBASE_API_KEY env)
  --project-id <id>        Firebase Project ID (or VITE_FIREBASE_PROJECT_ID env)
  --help                   Show this help

Examples:
  npx tsx scripts/seed-admin.ts --email admin@senjr.app --password admin123 --name "Super Admin"
`)
    process.exit(1)
  }

  console.log(`\n🔐 Seeding admin user: ${email}\n`)

  try {
    // Step 1: Create Firebase Auth user via REST API
    console.log('📧 Creating Firebase Auth user...')
    const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
    const signUpRes = await fetch(signUpUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
        displayName,
      }),
    })

    const signUpData = await signUpRes.json() as { idToken?: string; localId?: string; error?: { message: string } }

    if (!signUpRes.ok || signUpData.error) {
      const errMsg = signUpData.error?.message || 'Unknown error'
      if (errMsg.includes('EMAIL_EXISTS')) {
        console.log('⚠️  User already exists in Auth. Attempting sign in to get uid...')
        const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`
        const signInRes = await fetch(signInUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, returnSecureToken: true }),
        })
        const signInData = await signInRes.json() as { localId?: string; idToken?: string; error?: { message: string } }
        if (!signInRes.ok || signInData.error) {
          console.error(`❌ Auth error: ${signInData.error?.message || 'Cannot sign in'}`)
          process.exit(1)
        }
        console.log(`✅ User exists: ${signInData.localId}`)
        await setupFirestoreRecord(projectId, signInData.localId!, email, displayName, apiKey, signInData.idToken!)
      } else {
        console.error(`❌ Auth error: ${errMsg}`)
        process.exit(1)
      }
    } else {
      console.log(`✅ Auth user created: ${signUpData.localId}`)
      await setupFirestoreRecord(projectId, signUpData.localId!, email, displayName, apiKey, signUpData.idToken!)
    }
  } catch (err) {
    console.error(`❌ Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    process.exit(1)
  }
}

async function setupFirestoreRecord(
  projectId: string,
  uid: string,
  email: string,
  displayName: string,
  apiKey: string,
  idToken: string
) {
  console.log('📝 Setting admin role in Firestore...')

  const now = new Date().toISOString()
  const docData = {
    fields: {
      uid: { stringValue: uid },
      email: { stringValue: email },
      displayName: { stringValue: displayName },
      role: { stringValue: 'admin' },
      onboardingCompleted: { booleanValue: true },
      createdAt: { stringValue: now },
      updatedAt: { stringValue: now },
    },
  }

  // Use Firestore REST API
  const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${uid}`
  const firestoreRes = await fetch(firestoreUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`,
    },
    body: JSON.stringify(docData),
  })

   if (!firestoreRes.ok) {
     const errBody = await firestoreRes.text()
     // Fallback: try without auth token (for Firestore with public write rules or emulator)
     console.log('⚠️  Trying Firestore write without auth token...')
     const fallbackRes = await fetch(firestoreUrl, {
       method: 'PATCH',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(docData),
     })
     if (!fallbackRes.ok) {
       const fallbackErr = await fallbackRes.text()
       console.error(`❌ Firestore error: ${fallbackErr}`)
       console.log(`\n⚠️  Could not write to Firestore automatically.`)
       console.log(`   The Auth user was created. Manually add this doc in Firebase Console:`)
       console.log(`   Collection: users`)
       console.log(`   Document ID: ${uid}`)
       console.log(`   Data: ${JSON.stringify({ uid, email, displayName, role: 'admin', createdAt: now, updatedAt: now }, null, 2)}`)
       console.log(`\n   Firebase Console: https://console.firebase.google.com/project/${projectId}/firestore/data/users`)
       process.exit(0)
     }
     // Use the errBody to show the error when first attempt fails
     console.error(`❌ Firestore error: ${errBody}`)
   }

  console.log(`✅ Firestore admin record created for ${email}`)
  console.log(`\n🎉 Admin user seeded successfully!`)
  console.log(`   UID: ${uid}`)
  console.log(`   Email: ${email}`)
  console.log(`   Role: admin`)
  console.log(`   Sign in at: ${process.env.VITE_FIREBASE_AUTH_DOMAIN || 'your app'}\n`)
}

function parseArgs(): Record<string, string> {
  const args = process.argv.slice(2)
  const result: Record<string, string> = {}
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--help') {
      return { help: 'true' }
    }
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2)
      if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
        result[key] = args[i + 1]
        i++
      } else {
        result[key] = 'true'
      }
    }
  }
  return result
}

seedAdmin()
