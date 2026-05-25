import type { VercelRequest, VercelResponse } from '@vercel/node'

interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface ChatHistory {
  [key: string]: Message[]
}

interface ChatCompletionResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

interface ApiErrorResponse {
  error?: {
    message?: string
  }
}

const rateLimitStore: Record<string, { count: number; resetTime: number }> = {}
const chatHistory: ChatHistory = {}
const MAX_HISTORY = 10

function rateLimit(key: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 1000
  const limit = 20

  if (!rateLimitStore[key] || rateLimitStore[key].resetTime < now) {
    rateLimitStore[key] = { count: 1, resetTime: now + windowMs }
    return true
  }

  if (rateLimitStore[key].count >= limit) {
    return false
  }

  rateLimitStore[key].count++
  return true
}

function getSystemPrompt(tutorType: string): string {
  const prompts: Record<string, string> = {
    math: `You are Arya, a friendly and encouraging JEE Mathematics tutor from India. You explain concepts in simple Hindi-English mix (Hinglish). Your teaching style:
- Use simple language, avoid complex jargon
- Give step-by-step explanations with examples
- Encourage students, never discourage
- Use real-life examples when possible
- Be patient and supportive
Focus on: Calculus, Algebra, Trigonometry, Coordinate Geometry, and JEE-related topics.`,
    
    uppolice: `You are a friendly UP Police/UP Constable exam tutor. You help students prepare for:
- General Awareness (History, Geography, Polity, Current Affairs)
- Numerical Ability
- Reasoning Ability
- General Hindi
Explain in simple Hindi-English mix (Hinglish). Give tips and tricks for competitive exams.`,
    
    english: `You are an expert English and Reasoning tutor. You help with:
- English: Grammar, Vocabulary, Comprehension, Sentence Improvement
- Reasoning: Verbal (Coding-Decoding, Blood Relations, Sitting Arrangement) and Non-Verbal (Series, Mirror/Water Images)
Explain in simple Hindi-English mix with examples and shortcuts.`,
    
    general: `You are a helpful school/college tutor. You help students with:
- Any subject doubts
- Homework help
- Concept explanations
- Exam preparation
Be friendly, patient, and encouraging. Use simple language.`
  }

  return prompts[tutorType] || prompts.general
}

function getActionPrompt(action: string): string {
  const actionPrompts: Record<string, string> = {
    explain: `Provide a detailed step-by-step explanation. Break down the concept into simple parts. Use examples.`,
    hint: `Give a helpful hint or clue without giving the full answer. Guide the student to think in the right direction.`,
    practice: `Create a practice question appropriate for the student's level. Provide the answer at the end.`,
    check: `Carefully check the student's answer. Explain if it's correct or not. If wrong, show the right approach.`,
    revise: `Summarize the key points of the topic. Create a quick revision guide with important formulas/concepts.`
  }

  return actionPrompts[action] || ''
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' })
  }

  const clientIp = request.headers['x-forwarded-for'] as string || 'unknown'
  if (!rateLimit(clientIp)) {
    return response.status(429).json({ error: 'Too many requests. Please wait a moment.' })
  }

  const { message, tutorType = 'general', action, chatId = 'default', clearHistory } = request.body

  if (!message) {
    return response.status(400).json({ error: 'Message is required' })
  }

  try {
    const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY
    
    if (!apiKey) {
      return response.status(500).json({ 
        error: 'AI service not configured. Please set GROQ_API_KEY or OPENAI_API_KEY in environment variables.' 
      })
    }

    if (clearHistory) {
      chatHistory[chatId] = []
      return response.status(200).json({ response: 'Chat history cleared.' })
    }

     const systemPrompt = getSystemPrompt(tutorType)
     const actionPrompt = action ? getActionPrompt(action) : ''
 
     const conversationHistory = chatHistory[chatId] || []
    
    const userMessage: Message = { role: 'user', content: message + (actionPrompt ? `\n\n[Action: ${actionPrompt}]` : '') }
    conversationHistory.push(userMessage)

    const messages: Message[] = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-MAX_HISTORY)
    ]

    const isGroq = !!process.env.GROQ_API_KEY
    const baseUrl = isGroq ? 'https://api.groq.com/openai/v1' : 'https://api.openai.com/v1'
    const model = isGroq ? 'llama-3.1-8b-instant' : 'gpt-4o-mini'

    const aiResponse = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    })

    if (!aiResponse.ok) {
      const errorData = await aiResponse.json().catch(() => ({})) as ApiErrorResponse
      throw new Error(errorData.error?.message || `AI API error: ${aiResponse.status}`)
    }

    const data = await aiResponse.json() as ChatCompletionResponse
    const assistantMessage: Message = { 
      role: 'assistant', 
      content: data.choices[0].message.content 
    }

    conversationHistory.push(assistantMessage)
    chatHistory[chatId] = conversationHistory.slice(-MAX_HISTORY)

    return response.status(200).json({ 
      response: assistantMessage.content,
      chatId 
    })

  } catch (error) {
    console.error('AI Tutor error:', error)
    return response.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to get AI response' 
    })
  }
}
