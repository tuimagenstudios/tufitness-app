# 💪 TU FITNESS — Tu coach digital

App de fitness personalizada con IA (Gemini). React + Vite. Deploy en GitHub Pages.

## Stack
- React 18 + Vite 5
- Gemini API (`gemini-2.0-flash-lite`)
- CSS puro (sin Tailwind) — design system propio
- GitHub Actions → GitHub Pages (deploy automático)

## Pantallas
- Welcome / Splash
- Onboarding (6 pasos)
- Interpretación IA del perfil
- Dashboard con coach IA en tiempo real
- Dieta personalizada (macros calculados)
- Rutina según objetivo
- Progreso + gráfico de peso
- Rewards / Logros

## Setup local

```bash
# 1. Clonar
git clone https://github.com/tuimagenstudios/tufitness-app.git
cd tufitness-app

# 2. Instalar dependencias
npm install

# 3. Configurar API Key
cp .env.example .env
# Editar .env y poner tu VITE_GEMINI_API_KEY

# 4. Correr en local
npm run dev
```

## Deploy en GitHub Pages

### Paso 1 — Agregar el Secret en GitHub
Settings del repo → Secrets and variables → Actions → New repository secret:
- Name: `VITE_GEMINI_API_KEY`
- Value: tu API key de Gemini

### Paso 2 — Activar GitHub Pages
Settings → Pages → Source: **GitHub Actions**

### Paso 3 — Push a main
Cada push a `main` dispara el deploy automático. La URL queda en:
```
https://tuimagenstudios.github.io/tufitness-app/
```

## Logos
Poné tus imágenes en `public/assets/`:
- `logo.png` — logo principal (fondo oscuro)
- `logo1.png` — versión alternativa

## Créditos
Desarrollado con ❤️ por [Tuimagen Studio](https://tuimagenstudios.github.io)
