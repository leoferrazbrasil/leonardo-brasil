import { Mic, Send, Square, VolumeX } from 'lucide-react';
import { useCallback } from 'react';
import { useSpeechCapture } from '../hooks/useSpeechCapture';
import { useAssistantStore } from '../store/assistantStore';

export function CommandConsole() {
  const input = useAssistantStore((state) => state.input);
  const setInput = useAssistantStore((state) => state.setInput);
  const submitCommand = useAssistantStore((state) => state.submitCommand);
  const cancelAudio = useAssistantStore((state) => state.cancelAudio);
  const isSpeaking = useAssistantStore((state) => state.isSpeaking);
  const setListening = useAssistantStore((state) => state.setListening);

  const submit = useCallback(() => {
    void submitCommand(input);
  }, [input, submitCommand]);

  const { isCapturing, startCapture, stopCapture } = useSpeechCapture({
    disabled: isSpeaking,
    onTranscript: (text) => {
      setListening(false);
      void submitCommand(text);
    }
  });

  const toggleMic = () => {
    if (isCapturing) {
      stopCapture();
      setListening(false);
      return;
    }

    setListening(true);
    void startCapture();
  };

  return (
    <div className="absolute bottom-0 left-0 z-30 w-full px-3 pb-3 md:px-8 md:pb-8">
      <form
        className="glass-panel mx-auto flex min-h-16 w-full max-w-5xl items-center gap-2 rounded-lg p-2 md:gap-3 md:p-3"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <button
          className="grid h-12 w-12 shrink-0 place-items-center rounded-md border border-signal/15 bg-signal/5 text-coral transition hover:bg-coral hover:text-void"
          type="button"
          onClick={toggleMic}
          title={isCapturing ? 'Encerrar captura' : 'Capturar voz'}
          disabled={isSpeaking}
        >
          {isCapturing ? <Square size={18} /> : <Mic size={18} />}
        </button>
        <input
          className="h-12 min-w-0 flex-1 rounded-md border border-signal/10 bg-void/70 px-4 font-mono text-sm text-signal outline-none placeholder:text-signal/35 focus:border-coral"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Comando para o Brasa"
        />
        <button
          className="grid h-12 w-12 shrink-0 place-items-center rounded-md border border-coral/40 bg-coral text-void transition hover:bg-ember"
          type="submit"
          title="Enviar"
        >
          <Send size={18} />
        </button>
        <button
          className="grid h-12 w-12 shrink-0 place-items-center rounded-md border border-signal/15 bg-signal/5 text-signal/80 transition hover:bg-signal hover:text-void"
          type="button"
          onClick={cancelAudio}
          title="Cancelar áudio"
        >
          <VolumeX size={18} />
        </button>
      </form>
    </div>
  );
}
