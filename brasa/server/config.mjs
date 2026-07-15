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
