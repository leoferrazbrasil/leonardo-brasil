# Leonardo Brasil

Site de **marca pessoal** de Leonardo Brasil — estrutura de vendas para negócios locais.
Landing de conversão para o domínio **leonardobrasil.com.br**.

> Projeto **independente** do Funil Comercial (repositório e hospedagem separados). Vende o mesmo método (4 camadas: Presença · Aquisição · Conversão · Escala), com enquadramento de marca pessoal, para testar estratégias de conversão.

**Stack:** Vite + React 18 + TypeScript + Tailwind 3 + Express para `/api/*`.

## Antes de publicar (2 ajustes)

1. **Número de WhatsApp** — em `src/App.tsx`, troque a constante:
   ```ts
   const WHATSAPP_NUMBER = "5551996737359"; // ← seu número pessoal (só dígitos, DDI 55)
   ```
2. **Foto** — coloque sua foto em `public/leonardo.jpg` (usada no hero e no OG). Sem ela, o hero degrada sem quebrar.

## Rodar local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # gera dist/
npm run preview    # confere o build local
```

## Deploy na Hostinger (leonardobrasil.com.br)

O `public/.htaccess` (SPA + cache) é publicado junto no build. Duas formas:

**A) Git deploy automático (recomendado, igual ao funilcomercial.com)**
1. No hPanel da Hostinger → **Sites → leonardobrasil.com.br → Avançado → GIT**.
2. Conecte este repositório (`github.com/leoferrazbrasil/leonardo-brasil`), branch `main`.
3. Configure o build: **Framework** Vite · **Build** `npm run build` · **Saída** `dist` · **Root** `./`.
4. Cada `git push` na `main` republica.

**B) Upload manual**
1. `npm run build` local.
2. Suba o conteúdo de **`dist/`** (incluindo o `.htaccess`) para a pasta pública do domínio (`public_html` ou a raiz do site `leonardobrasil.com.br`).

> O site principal não usa segredos no front-end. As variáveis sensíveis do Brasa ficam apenas no ambiente da Hostinger.

## Brasa no subdominio

O Brasa vive como artefato estatico em `public/brasa/`, publicado junto ao build raiz em `dist/brasa/`.
Como a Hostinger conecta a implantacao apenas ao dominio principal, a API segura roda no dominio raiz:

- Front-end Brasa: `https://brasa.leonardobrasil.com.br`
- API Node/Express: `https://leonardobrasil.com.br/api/*`
- Configuracao Hostinger: Root `./`, build `npm run build`, saida `dist`, branch `main`
- Framework/preset da Hostinger: `Express.js` ou `Other`, nao `Vite`
- Entrada/entry file: `app.js`
- Runtime: o script `npm start` inicia `app.js`, que sobe `server/index.mjs`

Variaveis necessarias no hPanel, sem commitar chaves reais:

```env
NODE_ENV=production
ANTHROPIC_API_KEY=
ANTHROPIC_MODEL=claude-sonnet-4-5
GEMINI_API_KEY=
GEMINI_MODEL=gemini-3.5-flash
GEMINI_TTS_MODEL=gemini-3.1-flash-tts-preview
GEMINI_TTS_VOICE=Charon
ELEVENLABS_API_KEY=
ELEVENLABS_VOICE_ID=
ELEVENLABS_MODEL_ID=eleven_multilingual_v2
STT_API_KEY=
BRASA_AUTOMATION_WEBHOOK_URL=
```

## Estrutura

```
src/App.tsx      → a landing inteira (hero, 4 camadas, método, para quem, prova, FAQ, CTA, FAB WhatsApp)
src/index.css    → Tailwind + paleta navy/azul + animações
tailwind.config  → paleta pessoal (ink/panel/accent azul)
public/          → .htaccess, favicon, (adicione leonardo.jpg)
```
