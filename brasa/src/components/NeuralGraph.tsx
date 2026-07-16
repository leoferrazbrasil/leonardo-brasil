import { useMemo } from 'react';
import { buildBrainGraph } from '../lib/graph';
import { useAssistantStore } from '../store/assistantStore';
import type { BrainGraphNode, BrainNote } from '../types/brain';

interface PositionedNode extends BrainGraphNode {
  x: number;
  y: number;
}

const viewBox = {
  width: 1600,
  height: 900,
  centerX: 800,
  centerY: 450
};

function positionNodes(nodes: BrainGraphNode[]): PositionedNode[] {
  const areaNodes = nodes.filter((node) => node.kind === 'area');
  const positionedAreas = new Map<string, PositionedNode>();
  const positionedNodes: PositionedNode[] = [];

  areaNodes.forEach((node, index) => {
    const angle = (index / Math.max(areaNodes.length, 1)) * Math.PI * 2 - Math.PI / 2;
    const radiusX = 430;
    const radiusY = 255;
    const positioned = {
      ...node,
      x: viewBox.centerX + Math.cos(angle) * radiusX,
      y: viewBox.centerY + Math.sin(angle) * radiusY
    };

    positionedAreas.set(node.id, positioned);
    positionedNodes.push(positioned);
  });

  const noteNodes = nodes.filter((node) => node.kind === 'note');
  noteNodes.forEach((node, index) => {
    const areaNode = positionedAreas.get(`area-${node.area}`);
    const angle = (index / Math.max(noteNodes.length, 1)) * Math.PI * 2 + Math.PI / 5;
    const anchorX = areaNode?.x ?? viewBox.centerX;
    const anchorY = areaNode?.y ?? viewBox.centerY;

    positionedNodes.push({
      ...node,
      x: anchorX + Math.cos(angle) * 95,
      y: anchorY + Math.sin(angle) * 72
    });
  });

  return positionedNodes;
}

function activateNode(note: BrainNote | undefined, setSelectedNote: (note?: BrainNote) => void) {
  if (note) {
    setSelectedNote(note);
  }
}

export function NeuralGraph() {
  const notes = useAssistantStore((state) => state.notes);
  const setSelectedNote = useAssistantStore((state) => state.setSelectedNote);
  const memoryPulse = useAssistantStore((state) => state.memoryPulse);
  const graphData = useMemo(() => buildBrainGraph(notes), [notes]);
  const nodes = useMemo(() => positionNodes(graphData.nodes), [graphData.nodes]);
  const nodesById = useMemo(() => new Map(nodes.map((node) => [node.id, node])), [nodes]);
  const pulseClass = memoryPulse > 0 ? 'animate-pulse' : '';

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#05020a]">
      <svg
        aria-label="Mapa de memoria do Brasa"
        className="h-full w-full opacity-80"
        preserveAspectRatio="xMidYMid slice"
        viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
      >
        <defs>
          <radialGradient id="brainGlow" cx="50%" cy="46%" r="48%">
            <stop offset="0%" stopColor="#ff6a3d" stopOpacity="0.24" />
            <stop offset="42%" stopColor="#7c3cff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#05020a" stopOpacity="0" />
          </radialGradient>
          <filter id="nodeGlow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width={viewBox.width} height={viewBox.height} fill="url(#brainGlow)" />
        <g opacity="0.32">
          {graphData.links.map((link, index) => {
            const source = nodesById.get(link.source);
            const target = nodesById.get(link.target);
            if (!source || !target) {
              return null;
            }

            return (
              <line
                key={`${link.source}-${link.target}-${index}`}
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke="#ffd2bf"
                strokeLinecap="round"
                strokeOpacity={0.22 + link.strength * 0.32}
                strokeWidth={0.7 + link.strength * 1.6}
              />
            );
          })}
        </g>

        <g className={pulseClass}>
          {nodes.map((node) => {
            const isNote = node.kind === 'note';
            const radius = isNote ? 4.5 : 10;

            return (
              <g
                key={node.id}
                aria-label={node.label}
                className="cursor-pointer outline-none transition-opacity hover:opacity-100 focus:opacity-100"
                filter="url(#nodeGlow)"
                onClick={() => activateNode(node.note, setSelectedNote)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    activateNode(node.note, setSelectedNote);
                  }
                }}
                opacity={isNote ? 0.78 : 0.92}
                role="button"
                tabIndex={0}
                transform={`translate(${node.x} ${node.y})`}
              >
                <circle fill={node.color} r={radius} />
                <circle fill="none" r={radius + 8} stroke={node.color} strokeOpacity="0.18" strokeWidth="1.2" />
                {!isNote ? (
                  <text
                    fill="#ffd2bf"
                    fontFamily="monospace"
                    fontSize="11"
                    letterSpacing="2"
                    textAnchor="middle"
                    y="29"
                  >
                    {node.label}
                  </text>
                ) : null}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
