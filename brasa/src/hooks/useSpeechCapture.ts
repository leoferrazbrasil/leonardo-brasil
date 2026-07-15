import { useCallback, useRef, useState } from 'react';

interface SpeechCaptureOptions {
  disabled: boolean;
  onTranscript: (text: string) => void;
}

export function useSpeechCapture({ disabled, onTranscript }: SpeechCaptureOptions) {
  const [isCapturing, setIsCapturing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  const stopCapture = useCallback(() => {
    mediaRecorderRef.current?.stop();
  }, []);

  const startCapture = useCallback(async () => {
    if (disabled || isCapturing) {
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    chunksRef.current = [];

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    recorder.onstop = async () => {
      setIsCapturing(false);
      stream.getTracks().forEach((track) => track.stop());
      const audio = new Blob(chunksRef.current, { type: 'audio/webm' });
      try {
        const response = await fetch('/api/stt/transcribe', {
          method: 'POST',
          headers: { 'Content-Type': 'audio/webm' },
          body: audio
        });
        const data = (await response.json()) as { text?: string };
        if (data.text?.trim()) {
          onTranscript(data.text.trim());
        }
      } catch {
        console.info('[Brasa] STT Whisper/Deepgram indisponível no momento.');
      }
    };

    mediaRecorderRef.current = recorder;
    recorder.start();
    setIsCapturing(true);
  }, [disabled, isCapturing, onTranscript]);

  return { isCapturing, startCapture, stopCapture };
}
