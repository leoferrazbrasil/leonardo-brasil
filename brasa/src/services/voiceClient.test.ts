import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { speakWithElevenLabs } from './voiceClient';

class MockAudio {
  static instances: MockAudio[] = [];
  static rejectPlay = false;
  onended: (() => void) | null = null;
  onerror: (() => void) | null = null;
  play = vi.fn(async () => {
    if (MockAudio.rejectPlay) {
      throw new Error('Autoplay blocked');
    }

    this.onended?.();
  });

  constructor(public src: string) {
    MockAudio.instances.push(this);
  }
}

describe('speakWithElevenLabs', () => {
  const originalFetch = globalThis.fetch;
  const originalAudio = globalThis.Audio;
  const originalCreateObjectURL = URL.createObjectURL;
  const originalRevokeObjectURL = URL.revokeObjectURL;
  const originalSpeechSynthesis = window.speechSynthesis;
  const originalSpeechSynthesisUtterance = window.SpeechSynthesisUtterance;

  beforeEach(() => {
    MockAudio.instances = [];
    MockAudio.rejectPlay = false;
    vi.stubGlobal('Audio', MockAudio);
    URL.createObjectURL = vi.fn(() => 'blob:audio');
    URL.revokeObjectURL = vi.fn();
    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      value: {
        cancel: vi.fn(),
        speak: vi.fn((utterance: SpeechSynthesisUtterance) => {
          utterance.onend?.(new Event('end') as SpeechSynthesisEvent);
        })
      }
    });
    vi.stubGlobal(
      'SpeechSynthesisUtterance',
      vi.fn(function SpeechSynthesisUtterance(this: SpeechSynthesisUtterance, text: string) {
        this.text = text;
      })
    );
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    globalThis.fetch = originalFetch;
    vi.stubGlobal('Audio', originalAudio);
    URL.createObjectURL = originalCreateObjectURL;
    URL.revokeObjectURL = originalRevokeObjectURL;
    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      value: originalSpeechSynthesis
    });
    vi.stubGlobal('SpeechSynthesisUtterance', originalSpeechSynthesisUtterance);
  });

  it('plays remote audio when the TTS proxy returns audio', async () => {
    globalThis.fetch = vi.fn(
      async () => new Response(new Blob(['wav']), { status: 200, headers: { 'Content-Type': 'audio/wav' } })
    );

    await speakWithElevenLabs('Senhor, teste.');

    expect(MockAudio.instances).toHaveLength(1);
    expect(MockAudio.instances[0].play).toHaveBeenCalledTimes(1);
    expect(window.speechSynthesis.speak).not.toHaveBeenCalled();
  });

  it('falls back to browser speech when the remote TTS proxy fails', async () => {
    globalThis.fetch = vi.fn(async () => new Response(JSON.stringify({ error: 'blocked' }), { status: 403 }));

    await speakWithElevenLabs('Senhor, teste.');

    expect(window.speechSynthesis.speak).toHaveBeenCalledTimes(1);
    expect(SpeechSynthesisUtterance).toHaveBeenCalledWith('Senhor, teste.');
  });

  it('falls back to browser speech when audio playback is rejected', async () => {
    MockAudio.rejectPlay = true;
    globalThis.fetch = vi.fn(
      async () => new Response(new Blob(['wav']), { status: 200, headers: { 'Content-Type': 'audio/wav' } })
    );

    await speakWithElevenLabs('Senhor, teste.');

    expect(window.speechSynthesis.speak).toHaveBeenCalledTimes(1);
  });

  it('falls back to browser speech when the remote TTS proxy hangs', async () => {
    vi.useFakeTimers();
    globalThis.fetch = vi.fn(
      (_url, init) =>
        new Promise<Response>((_resolve, reject) => {
          const signal = (init as RequestInit).signal as AbortSignal;
          signal.addEventListener('abort', () => {
            reject(new DOMException('aborted', 'AbortError'));
          });
        })
    );

    const speechPromise = speakWithElevenLabs('Senhor, teste.');

    await vi.advanceTimersByTimeAsync(10_001);
    await speechPromise;

    expect(window.speechSynthesis.speak).toHaveBeenCalledTimes(1);
  });
});
