import { getApiUrl } from './apiBase';

export async function speakWithElevenLabs(text: string, signal?: AbortSignal): Promise<void> {
  if (!text.trim()) {
    return;
  }

  try {
    const response = await fetch(getApiUrl('/api/elevenlabs/tts'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
      signal
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs proxy respondeu ${response.status}`);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);

    await new Promise<void>((resolve, reject) => {
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        resolve();
      };
      audio.onerror = () => {
        URL.revokeObjectURL(audioUrl);
        reject(new Error('Falha ao reproduzir TTS'));
      };
      void audio.play();
    });
  } catch {
    console.info('[Brasa] TTS ElevenLabs indisponível no momento. Texto:', text);
  }
}
