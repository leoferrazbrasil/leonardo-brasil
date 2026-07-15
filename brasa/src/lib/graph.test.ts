import { describe, expect, it } from 'vitest';
import { buildBrainGraph } from './graph';
import type { BrainNote } from '../types/brain';

const now = '2026-07-15T00:00:00.000Z';
const notes: BrainNote[] = [
  { id: 'p1', title: 'Presença', area: 'PROJETOS', content: 'Site e Google Meu Negócio.', createdAt: now, updatedAt: now },
  { id: 'p2', title: 'Aquisição', area: 'PROJETOS', content: 'Google Ads e Meta Ads.', createdAt: now, updatedAt: now },
  { id: 'm1', title: 'MRR', area: 'METAS', content: 'Chegar a R$20k MRR.', createdAt: now, updatedAt: now }
];

describe('buildBrainGraph', () => {
  it('creates area hubs, note nodes and relation links', () => {
    const graph = buildBrainGraph(notes);

    expect(graph.nodes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'area-PROJETOS', kind: 'area', label: 'PROJETOS' }),
        expect.objectContaining({ id: 'p1', kind: 'note', area: 'PROJETOS' }),
        expect.objectContaining({ id: 'm1', kind: 'note', area: 'METAS' })
      ])
    );
    expect(graph.links).toEqual(
      expect.arrayContaining([
        { source: 'area-PROJETOS', target: 'p1', strength: 0.75 },
        { source: 'p1', target: 'p2', strength: 0.34 }
      ])
    );
  });
});
