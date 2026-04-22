// ── Gemini AI Hook ──
// Modelo: gemini-2.0-flash-lite (rápido, liviano, perfecto para coach)

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'TU_API_KEY_AQUI'
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${GEMINI_API_KEY}`

export async function askGemini(systemPrompt, userMessage) {
  const body = {
    contents: [
      {
        role: 'user',
        parts: [{ text: `${systemPrompt}\n\nUsuario: ${userMessage}` }]
      }
    ],
    generationConfig: {
      temperature: 0.8,
      maxOutputTokens: 300,
    }
  }

  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

  if (!res.ok) throw new Error(`Gemini API error: ${res.status}`)
  const data = await res.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sin respuesta del coach.'
}

export function buildCoachPrompt(userData, plan) {
  return `Eres el coach de fitness de TU FITNESS. Eres directo, motivador y preciso.
Conoces al usuario: ${userData.name}, ${userData.age} años, ${userData.weight}kg, ${userData.height}cm.
Objetivo: ${userData.goal === 'muscle' ? 'ganar masa muscular' : userData.goal === 'fat' ? 'perder grasa' : 'recomposición'}.
Nivel: ${userData.level === 'beg' ? 'principiante' : userData.level === 'int' ? 'intermedio' : 'avanzado'}.
Plan: ${plan.kcal} kcal, ${plan.macros.protein}g proteína, ${plan.macros.carbs}g carbos, ${plan.macros.fat}g grasas.
Desayuno habitual: ${userData.breakfast}.
Responde en español, máximo 2-3 oraciones. Sin asteriscos ni formato markdown. Directo y con energía.`
}
