# Brasa

Assistente pessoal de voz com React, Vite, TypeScript, Tailwind, Framer Motion, Zustand, IndexedDB, orbe 3D e Second Brain neural em 3D.

## Rodar Localmente Em Modo Frontend

```bash
npm install
npm run dev
```

## Rodar Localmente Em Modo Full-Stack

```bash
copy .env.example .env.local
npm run build
npm start
```

Preencha no `.env.local`:

- `PORT`
- `ANTHROPIC_API_KEY`
- `ANTHROPIC_MODEL`
- `ELEVENLABS_API_KEY`
- `ELEVENLABS_VOICE_ID`
- `ELEVENLABS_MODEL_ID`
- `STT_API_KEY`
- `BRASA_AUTOMATION_WEBHOOK_URL` para n8n/Make

As variaveis `VITE_ANTHROPIC_API_KEY`, `VITE_ELEVENLABS_API_KEY` e `VITE_STT_API_KEY` aparecem apenas porque foram solicitadas na especificacao inicial. Nao use `VITE_*` para segredos em producao, pois tudo que comeca com `VITE_` pode ser exposto ao navegador.

## Comandos

```bash
npm test
npm run typecheck
npm run build
npm run dev
npm start
npm run dev:server
```

## Producao Hostinger

Use o guia [HOSTINGER.md](./HOSTINGER.md) para configurar o Aplicativo Web com Node.js 22.x, build command, start command e variaveis de ambiente.

## Memoria Viva

O prompt instrui o Claude a emitir exatamente:

```text
[[SAVE:area|titulo|texto]]
```

O frontend remove essa tag antes do TTS, salva a memoria no IndexedDB, atualiza o Zustand e dispara pulso visual no grafo.
