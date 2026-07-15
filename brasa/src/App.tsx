import { AssistantShell } from './components/AssistantShell';
import { BootOverlay } from './components/BootOverlay';
import { NoteModal } from './components/NoteModal';
import { useAssistantRuntime } from './hooks/useAssistantRuntime';
import { useAssistantStore } from './store/assistantStore';

export default function App() {
  useAssistantRuntime();
  const isBooted = useAssistantStore((state) => state.isBooted);

  return (
    <main className="h-dvh w-screen overflow-hidden bg-void text-signal">
      <AssistantShell />
      {!isBooted && <BootOverlay />}
      <NoteModal />
    </main>
  );
}
