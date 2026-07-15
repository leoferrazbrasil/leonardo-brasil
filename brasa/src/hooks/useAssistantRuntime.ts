import { useEffect } from 'react';
import { useAssistantStore } from '../store/assistantStore';

export function useAssistantRuntime() {
  const hydrate = useAssistantStore((state) => state.hydrate);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);
}
