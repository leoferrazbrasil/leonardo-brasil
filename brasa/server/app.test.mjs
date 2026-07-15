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
