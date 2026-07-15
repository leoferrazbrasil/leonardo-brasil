# Brasa Hostinger Full-Stack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Evoluir o Brasa para uma aplicação Node/Express all-in-one na Hostinger, com frontend Vite servido em produção e backend seguro para Claude, ElevenLabs, STT, webhooks e health check.

**Architecture:** O frontend React/Vite continua gerando `dist/`. O backend Express em `server/app.mjs` expõe `/api/*`, serve assets estáticos e faz fallback SPA para `index.html`; `server/index.mjs` apenas instancia e escuta a porta da Hostinger.

**Tech Stack:** React, Vite, TypeScript, Node.js 22.x, Express, Vitest, Hostinger Web App.

## Global Constraints

- Node.js alvo na Hostinger: `22.x`.
- Domínio alvo: `brasa.leonardobrasil.com.br`.
- Não usar variáveis `VITE_*` para segredos em produção.
- Não colocar senha FTP em GitHub.
- Chaves ficam apenas em variáveis de ambiente da Hostinger.
- Frontend deve continuar usando rotas relativas `/api/...`.
- Health check só pode expor booleanos de configuração, nunca valores de segredo.
- Escuta deve continuar desligada enquanto TTS fala.

---

### Task 1: Backend Pure Helpers

**Files:**
- Create: `server/config.mjs`
- Test: `server/config.test.mjs`

**Interfaces:**
- Produces: `getIntegrationStatus(env)`, `sanitizeClaudeMessages(messages)`, `isProduction(env)`

- [ ] **Step 1: Write failing helper tests**

```js
import { describe, expect, it } from 'vitest';
import { getIntegrationStatus, isProduction, sanitizeClaudeMessages } from './config.mjs';

describe('server config helpers', () => {
  it('reports integration status without leaking secret values', () => {
    const status = getIntegrationStatus({
      ANTHROPIC_API_KEY: 'sk-ant-secret',
      ANTHROPIC_MODEL: 'claude-model',
      ELEVENLABS_API_KEY: '',
      ELEVENLABS_VOICE_ID: 'voice-id',
      STT_API_KEY: 'deepgram-secret',
      BRASA_AUTOMATION_WEBHOOK_URL: 'https://hook.example'
    });

    expect(status).toEqual({
      anthropic: true,
      elevenLabs: false,
      stt: true,
      automationWebhook: true
    });
    expect(JSON.stringify(status)).not.toContain('secret');
  });

  it('keeps only Claude-compatible chat messages', () => {
    const messages = sanitizeClaudeMessages([
      { role: 'system', content: 'ignore' },
      { role: 'user', content: 'Olá' },
      { role: 'assistant', content: 'Pronto.' },
      { role: 'tool', content: 'ignore' },
      { role: 'user', content: '' }
    ]);

    expect(messages).toEqual([
      { role: 'user', content: 'Olá' },
      { role: 'assistant', content: 'Pronto.' }
    ]);
  });

  it('detects production from NODE_ENV', () => {
    expect(isProduction({ NODE_ENV: 'production' })).toBe(true);
    expect(isProduction({ NODE_ENV: 'development' })).toBe(false);
  });
});
```

- [ ] **Step 2: Run red test**

Run: `npm test -- server/config.test.mjs`

Expected: fail because `server/config.mjs` does not exist.

- [ ] **Step 3: Implement helpers**

```js
export function isProduction(env = process.env) {
  return env.NODE_ENV === 'production';
}

export function getIntegrationStatus(env = process.env) {
  return {
    anthropic: Boolean(env.ANTHROPIC_API_KEY && env.ANTHROPIC_MODEL),
    elevenLabs: Boolean(env.ELEVENLABS_API_KEY && env.ELEVENLABS_VOICE_ID),
    stt: Boolean(env.STT_API_KEY),
    automationWebhook: Boolean(env.BRASA_AUTOMATION_WEBHOOK_URL)
  };
}

export function sanitizeClaudeMessages(messages) {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .filter((message) => message?.role === 'user' || message?.role === 'assistant')
    .map((message) => ({ role: message.role, content: String(message.content || '').trim() }))
    .filter((message) => message.content.length > 0);
}
```

- [ ] **Step 4: Run green test**

Run: `npm test -- server/config.test.mjs`

Expected: pass.

### Task 2: Express App Routes

**Files:**
- Create: `server/app.mjs`
- Test: `server/app.test.mjs`

**Interfaces:**
- Consumes: helpers from `server/config.mjs`
- Produces: `createBrasaApp({ env, fetchImpl, distDir })`

- [ ] **Step 1: Write failing app tests**

```js
import { describe, expect, it } from 'vitest';
import { createBrasaApp } from './app.mjs';

async function request(app, path, options = {}) {
  const server = app.listen(0);
  const { port } = server.address();
  try {
    return await fetch(`http://127.0.0.1:${port}${path}`, options);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

describe('Brasa Express app', () => {
  it('returns health status without secrets', async () => {
    const app = createBrasaApp({
      env: {
        npm_package_version: '0.1.0',
        ANTHROPIC_API_KEY: 'secret',
        ANTHROPIC_MODEL: 'claude',
        STT_API_KEY: 'secret'
      }
    });

    const response = await request(app, '/api/health');
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      ok: true,
      version: '0.1.0',
      integrations: {
        anthropic: true,
        elevenLabs: false,
        stt: true,
        automationWebhook: false
      }
    });
    expect(JSON.stringify(body)).not.toContain('secret');
  });

  it('returns 503 for Claude when env is missing', async () => {
    const app = createBrasaApp({ env: {} });
    const response = await request(app, '/api/anthropic/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userText: 'Olá', messages: [] })
    });

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toMatchObject({ error: 'Anthropic não configurado.' });
  });

  it('calls Claude with sanitized messages and returns text', async () => {
    const calls = [];
    const app = createBrasaApp({
      env: { ANTHROPIC_API_KEY: 'secret', ANTHROPIC_MODEL: 'claude-test' },
      fetchImpl: async (url, init) => {
        calls.push({ url, init });
        return new Response(JSON.stringify({ content: [{ type: 'text', text: 'Resposta do Brasa.' }] }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    });

    const response = await request(app, '/api/anthropic/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemPrompt: 'Sistema',
        userText: 'Comando',
        messages: [{ role: 'system', content: 'x' }, { role: 'user', content: 'Oi' }]
      })
    });

    const body = await response.json();
    const sent = JSON.parse(calls[0].init.body);

    expect(response.status).toBe(200);
    expect(body).toEqual({ text: 'Resposta do Brasa.' });
    expect(sent.model).toBe('claude-test');
    expect(sent.system).toBe('Sistema');
    expect(sent.messages).toEqual([
      { role: 'user', content: 'Oi' },
      { role: 'user', content: 'Comando' }
    ]);
  });
});
```

- [ ] **Step 2: Run red test**

Run: `npm test -- server/app.test.mjs`

Expected: fail because `server/app.mjs` does not exist and Express is not installed.

- [ ] **Step 3: Install Express**

Run: `npm install express`

Expected: dependency added to `package.json` and `package-lock.json`.

- [ ] **Step 4: Implement Express app**

Implement `createBrasaApp` with `/api/health`, `/api/anthropic/messages`, `/api/elevenlabs/tts`, `/api/stt/transcribe`, `/api/webhooks/automation`, static `dist/assets` cache and SPA fallback.

- [ ] **Step 5: Run green test**

Run: `npm test -- server/app.test.mjs`

Expected: pass.

### Task 3: Production Entrypoint And Scripts

**Files:**
- Create: `server/index.mjs`
- Modify: `package.json`
- Modify: `.env.example`

**Interfaces:**
- Consumes: `createBrasaApp`
- Produces: `npm start`, `npm run dev:server`

- [ ] **Step 1: Update scripts**

Set:

```json
"start": "node server/index.mjs",
"dev:server": "node server/index.mjs"
```

- [ ] **Step 2: Update env example**

Ensure `.env.example` includes:

```text
PORT=3000
NODE_ENV=production
ANTHROPIC_API_KEY=
ANTHROPIC_MODEL=
ELEVENLABS_API_KEY=
ELEVENLABS_VOICE_ID=
ELEVENLABS_MODEL_ID=eleven_multilingual_v2
STT_API_KEY=
BRASA_AUTOMATION_WEBHOOK_URL=
```

- [ ] **Step 3: Add production entrypoint**

`server/index.mjs` imports `createBrasaApp`, reads `process.env.PORT || 3000`, and logs the active port.

- [ ] **Step 4: Smoke test server locally**

Run: `npm run build`, then start `npm start` and request `http://127.0.0.1:3000/api/health`.

Expected: JSON with `ok: true`.

### Task 4: Documentation And Hostinger Package

**Files:**
- Modify: `README.md`
- Create: `HOSTINGER.md`

**Interfaces:**
- Produces deployment instructions for hPanel Web App.

- [ ] **Step 1: Document local full-stack mode**

README must show:

```bash
npm install
npm run build
npm start
```

- [ ] **Step 2: Document Hostinger settings**

`HOSTINGER.md` must list Node `22.x`, build command `npm install && npm run build`, start command `npm start`, app root as project root and required env vars.

- [ ] **Step 3: Final verification**

Run:

```bash
npm test
npm run typecheck
npm run build
npm audit --omit=dev
```

Expected: tests pass, build exits 0, production audit exits 0.
