import { getApiUrl } from './apiBase';

async function speakWithBrowserVoice(text: string): Promise<void> {
  if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
    return;
  }

  await new Promise<void>((resolve) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.94;
    utterance.pitch = 0.86;
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  });
}

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
      throw new Error(`TTS proxy respondeu ${response.status}`);
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.startsWith('audio/')) {
      throw new Error(`TTS proxy retornou ${contentType || 'conteudo desconhecido'}`);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);

    await new Promise<void>((resolve, reject) => {
      const cleanup = () => {
        URL.revokeObjectURL(audioUrl);
      };

      audio.onended = () => {
        cleanup();
        resolve();
      };
      audio.onerror = () => {
        cleanup();
        reject(new Error('Falha ao reproduzir TTS'));
      };

      audio.play().catch((error) => {
        cleanup();
        reject(error);
      });
    });
  } catch (error) {
    if (signal?.aborted) {
      return;
    }

    console.info('[Brasa] TTS remoto indisponivel; usando voz local. Texto:', text, error);
    await speakWithBrowserVoice(text);
  }
}
