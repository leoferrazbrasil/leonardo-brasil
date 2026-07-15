import ForceGraph3D from 'react-force-graph-3d';
import { useMemo, useRef } from 'react';
import { buildBrainGraph } from '../lib/graph';
import { useAssistantStore } from '../store/assistantStore';
import type { BrainGraphNode } from '../types/brain';

export function NeuralGraph() {
  const graphRef = useRef<Record<string, unknown> | null>(null);
  const notes = useAssistantStore((state) => state.notes);
  const setSelectedNote = useAssistantStore((state) => state.setSelectedNote);
  const memoryPulse = useAssistantStore((state) => state.memoryPulse);
  const graphData = useMemo(() => buildBrainGraph(notes), [notes]);

  return (
    <div className="absolute inset-0 z-0">
      <ForceGraph3D
        ref={graphRef}
        graphData={graphData}
        backgroundColor="rgba(5,2,10,1)"
        nodeLabel={(node: BrainGraphNode) => node.label}
        nodeColor={(node: BrainGraphNode) => node.color}
        nodeVal={(node: BrainGraphNode) => node.val}
        linkColor={() => 'rgba(255, 210, 191, 0.18)'}
        linkOpacity={0.32}
        linkWidth={1.1}
        linkDirectionalParticles={memoryPulse > 0 ? 3 : 1}
        linkDirectionalParticleColor={() => '#ff6a3d'}
        linkDirectionalParticleWidth={1.8}
        onNodeClick={(node: BrainGraphNode & { x?: number; y?: number; z?: number }) => {
          if (node.note) {
            setSelectedNote(node.note);
          }

          const distance = 90;
          const x = node.x ?? 0;
          const y = node.y ?? 0;
          const z = node.z ?? 0;
          const ratio = 1 + distance / Math.hypot(x, y, z || 1);
          const cameraPosition = { x: x * ratio, y: y * ratio, z: z * ratio };
          const cameraApi = graphRef.current?.cameraPosition as
            | ((position: typeof cameraPosition, lookAt: { x: number; y: number; z: number }, ms: number) => void)
            | undefined;
          cameraApi?.(cameraPosition, { x, y, z }, 1200);
        }}
      />
    </div>
  );
}
