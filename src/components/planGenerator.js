// planGenerator.js — Lógica de generación de plan nutricional y metas

export function generatePlan(data) {
  const w = +data.weight
  const h = +data.height
  const age = +data.age
  const goal = data.goal

  const bmr = Math.round(10 * w + 6.25 * h - 5 * age + 5)
  const tdee = Math.round(bmr * 1.5)

  let kcal
  if (goal === 'muscle') kcal = tdee + 300
  else if (goal === 'fat') kcal = tdee - 450
  else kcal = tdee

  const proteinPerKg = goal === 'muscle' ? 2.0 : goal === 'fat' ? 2.2 : 1.8
  const protein = Math.round(w * proteinPerKg)
  const fat = Math.round(w * 0.9)
  const carbKcal = kcal - (protein * 4 + fat * 9)
  const carbs = Math.max(80, Math.round(carbKcal / 4))

  return { bmr, tdee, kcal, macros: { protein, carbs, fat } }
}

export function goalMeta(goal) {
  if (goal === 'muscle') return { label: 'Ganar masa muscular', short: 'Hipertrofia' }
  if (goal === 'fat')    return { label: 'Perder grasa',        short: 'Déficit' }
  return                         { label: 'Recomposición',       short: 'Mantener' }
}
