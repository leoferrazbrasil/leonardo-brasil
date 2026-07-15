export type AutomationEvent = 'memory.saved' | 'assistant.command' | 'note.updated';

export async function triggerAutomation(event: AutomationEvent, payload: unknown): Promise<void> {
  try {
    await fetch('/api/webhooks/automation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, payload })
    });
  } catch {
    console.info('[Brasa] Webhook n8n/Make não configurado:', event, payload);
  }
}
