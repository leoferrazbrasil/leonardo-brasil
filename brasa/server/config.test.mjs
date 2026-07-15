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
