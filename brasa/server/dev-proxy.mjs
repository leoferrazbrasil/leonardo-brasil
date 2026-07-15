import { createServer } from 'node:http';

const port = Number(process.env.BRASA_PROXY_PORT || 8787);

function readBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    request.on('data', (chunk) => chunks.push(chunk));
    request.on('end', () => resolve(Buffer.concat(chunks)));
    request.on('error', reject);
  });
}

function json(response, status, payload) {
  response.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:5173',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  });
  response.end(JSON.stringify(payload));
}

async function handleAnthropic(request, response) {
  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.VITE_ANTHROPIC_API_KEY;
  const model = process.env.ANTHROPIC_MODEL;

  if (!apiKey || !model) {
    json(response, 503, { text: 'Proxy Claude não configurado. Defina ANTHROPIC_API_KEY e ANTHROPIC_MODEL.' });
    return;
  }

  const body = JSON.parse((await readBody(request)).toString('utf8'));
  const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model,
      max_tokens: 900,
      system: body.systemPrompt,
      messages: [...body.messages, { role: 'user', content: body.userText }]
        .filter((message) => message.role === 'user' || message.role === 'assistant')
        .map((message) => ({ role: message.role, content: message.content }))
    })
  });

  const data = await anthropicResponse.json();
  const text = data.content?.map((part) => part.text).filter(Boolean).join('\n') || '';
  json(response, anthropicResponse.ok ? 200 : anthropicResponse.status, { text, raw: data });
}

async function handleElevenLabs(request, response) {
  const apiKey = process.env.ELEVENLABS_API_KEY || process.env.VITE_ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID;

  if (!apiKey || !voiceId) {
    json(response, 503, { error: 'Proxy ElevenLabs não configurado. Defina ELEVENLABS_API_KEY e ELEVENLABS_VOICE_ID.' });
    return;
  }

  const body = JSON.parse((await readBody(request)).toString('utf8'));
  const ttsResponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': apiKey
    },
    body: JSON.stringify({
      text: body.text,
      model_id: process.env.ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2',
      voice_settings: { stability: 0.48, similarity_boost: 0.78, style: 0.18, use_speaker_boost: true }
    })
  });

  response.writeHead(ttsResponse.status, {
    'Content-Type': ttsResponse.headers.get('Content-Type') || 'audio/mpeg',
    'Access-Control-Allow-Origin': 'http://localhost:5173'
  });
  const audio = Buffer.from(await ttsResponse.arrayBuffer());
  response.end(audio);
}

async function handleStt(request, response) {
  const apiKey = process.env.STT_API_KEY || process.env.VITE_STT_API_KEY;
  if (!apiKey) {
    json(response, 503, { text: '' });
    return;
  }

  const audio = await readBody(request);
  const sttResponse = await fetch('https://api.deepgram.com/v1/listen?model=nova-2&language=pt-BR&smart_format=true', {
    method: 'POST',
    headers: {
      Authorization: `Token ${apiKey}`,
      'Content-Type': request.headers['content-type'] || 'audio/webm'
    },
    body: audio
  });

  const data = await sttResponse.json();
  const text = data.results?.channels?.[0]?.alternatives?.[0]?.transcript || '';
  json(response, sttResponse.ok ? 200 : sttResponse.status, { text, raw: data });
}

async function handleAutomation(request, response) {
  const webhookUrl = process.env.BRASA_AUTOMATION_WEBHOOK_URL;
  const payload = await readBody(request);

  if (webhookUrl) {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload
    });
  }

  json(response, 200, { ok: true });
}

createServer(async (request, response) => {
  if (request.method === 'OPTIONS') {
    json(response, 200, { ok: true });
    return;
  }

  try {
    if (request.url === '/api/anthropic/messages' && request.method === 'POST') {
      await handleAnthropic(request, response);
      return;
    }

    if (request.url === '/api/elevenlabs/tts' && request.method === 'POST') {
      await handleElevenLabs(request, response);
      return;
    }

    if (request.url === '/api/stt/transcribe' && request.method === 'POST') {
      await handleStt(request, response);
      return;
    }

    if (request.url === '/api/webhooks/automation' && request.method === 'POST') {
      await handleAutomation(request, response);
      return;
    }

    json(response, 404, { error: 'Rota não encontrada.' });
  } catch (error) {
    json(response, 500, { error: error instanceof Error ? error.message : 'Erro inesperado.' });
  }
}).listen(port, () => {
  console.log(`Brasa dev proxy ativo em http://localhost:${port}`);
});
