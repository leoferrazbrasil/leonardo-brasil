import assert from 'node:assert/strict';
import test from 'node:test';
import { createMainApp } from './app.mjs';

async function request(app, path, options = {}) {
  const server = app.listen(0);
  const { port } = server.address();

  try {
    return await fetch(`http://127.0.0.1:${port}${path}`, options);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

test('health returns integration booleans without secrets', async () => {
  const app = createMainApp({
    env: {
      npm_package_version: '1.0.0',
      ANTHROPIC_API_KEY: 'secret',
      ANTHROPIC_MODEL: 'claude-sonnet-4-5'
    }
  });

  const response = await request(app, '/api/health');
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(body, {
    ok: true,
    version: '1.0.0',
    integrations: {
      anthropic: true,
      geminiTts: false,
      elevenLabs: false,
      stt: false,
      automationWebhook: false
    }
  });
  assert.equal(JSON.stringify(body).includes('secret'), false);
});

test('tts route uses Gemini TTS first and returns wav audio', async () => {
  const calls = [];
  const app = createMainApp({
    env: {
      GEMINI_API_KEY: 'gemini-secret',
      GEMINI_TTS_MODEL: 'gemini-2.5-flash-preview-tts',
      GEMINI_TTS_VOICE: 'Charon'
    },
    fetchImpl: async (url, init) => {
      calls.push({ url, init });
      const pcm = Buffer.alloc(8, 1).toString('base64');
      return new Response(JSON.stringify({ output_audio: { data: pcm } }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  });

  const response = await request(app, '/api/elevenlabs/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: 'Senhor, voz Gemini ativa.' })
  });

  const audio = Buffer.from(await response.arrayBuffer());
  const sent = JSON.parse(calls[0].init.body);

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'audio/wav');
  assert.equal(audio.subarray(0, 4).toString('ascii'), 'RIFF');
  assert.equal(audio.subarray(8, 12).toString('ascii'), 'WAVE');
  assert.equal(calls[0].url, 'https://generativelanguage.googleapis.com/v1beta/interactions');
  assert.equal(calls[0].init.headers['x-goog-api-key'], 'gemini-secret');
  assert.equal(sent.model, 'gemini-2.5-flash-preview-tts');
  assert.equal(sent.input, 'Say in Portuguese with a formal, strategic and warm executive tone: Senhor, voz Gemini ativa.');
  assert.deepEqual(sent.response_format, { type: 'audio' });
  assert.deepEqual(sent.generation_config, { speech_config: [{ voice: 'Charon' }] });
});

test('cors allows the Brasa subdomain', async () => {
  const app = createMainApp({ env: {} });
  const response = await request(app, '/api/health', {
    headers: { Origin: 'https://brasa.leonardobrasil.com.br' }
  });

  assert.equal(response.headers.get('access-control-allow-origin'), 'https://brasa.leonardobrasil.com.br');
});

test('anthropic route sends sanitized messages and returns text', async () => {
  const calls = [];
  const app = createMainApp({
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
      messages: [{ role: 'system', content: 'ignore' }, { role: 'user', content: 'Oi' }]
    })
  });

  const body = await response.json();
  const sent = JSON.parse(calls[0].init.body);

  assert.equal(response.status, 200);
  assert.deepEqual(body, { text: 'Resposta do Brasa.' });
  assert.equal(sent.model, 'claude-test');
  assert.deepEqual(sent.messages, [
    { role: 'user', content: 'Oi' },
    { role: 'user', content: 'Comando' }
  ]);
});
