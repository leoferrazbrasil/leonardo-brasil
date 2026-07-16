import { getApiUrl } from './apiBase';

const remoteTtsTimeoutMs = 10_000;

function createTimedSignal(parentSignal?: AbortSignal) {
  const controller = new AbortController();
  let abortedByParent = false;

  const abortFromParent = () => {
    abortedByParent = true;
    controller.abort(parentSignal?.reason);
  };

  if (parentSignal?.aborted) {
    abortFromParent();
  } else {
    parentSignal?.addEventListener('abort', abortFromParent, { once: true });
  }

  const timeoutId = window.setTimeout(() => {
    controller.abort(new DOMException('Remote TTS timeout', 'TimeoutError'));
  }, remoteTtsTimeoutMs);

  return {
    signal: controller.signal,
    wasAbortedByParent: () => abortedByParent,
    cleanup: () => {
      window.clearTimeout(timeoutId);
      parentSignal?.removeEventListener('abort', abortFromParent);
    }
  };
}

async function speakWithBrowserVoice(text: string): Promise<void> {
  if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
    return;
  }

  await new Promise<void>((resolve) => {
    let settled = false;
    const settle = () => {
      if (settled) {
        return;
      }

      settled = true;
      window.clearTimeout(safetyTimeoutId);
      resolve();
    };
    const safetyTimeoutId = window.setTimeout(settle, Math.min(12_000, 1_200 + text.length * 55));
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.94;
    utterance.pitch = 0.86;
    utterance.onend = settle;
    utterance.onerror = settle;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  });
}

export async function speakWithElevenLabs(text: string, signal?: AbortSignal): Promise<void> {
  if (!text.trim()) {
    return;
  }

  const timedSignal = createTimedSignal(signal);
  try {
    const response = await fetch(getApiUrl('/api/elevenlabs/tts'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
      signal: timedSignal.signal
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
    if (timedSignal.wasAbortedByParent()) {
      return;
    }

    console.info('[Brasa] TTS remoto indisponivel; usando voz local. Texto:', text, error);
    await speakWithBrowserVoice(text);
  } finally {
    timedSignal.cleanup();
  }
}
