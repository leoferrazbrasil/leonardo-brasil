import type { BrainArea, BrainGraph, BrainGraphLink, BrainGraphNode, BrainNote } from '../types/brain';

export const areaColors: Record<BrainArea, string> = {
  'VOCÊ': '#ffd2bf',
  METAS: '#ff3f6c',
  CARREIRA: '#7c3cff',
  PROJETOS: '#ff6a3d',
  FINANÇAS: '#34d399',
  APRENDIZADO: '#60a5fa',
  SAÚDE: '#fbbf24',
  RELAÇÕES: '#f472b6'
};

export function buildBrainGraph(notes: BrainNote[]): BrainGraph {
  const areas = Array.from(new Set(notes.map((note) => note.area)));
  const nodes: BrainGraphNode[] = areas.map((area) => ({
    id: `area-${area}`,
    label: area,
    area,
    kind: 'area',
    color: areaColors[area],
    val: 8
  }));

  const links: BrainGraphLink[] = [];

  for (const note of notes) {
    nodes.push({
      id: note.id,
      label: note.title,
      area: note.area,
      kind: 'note',
      color: areaColors[note.area],
      note,
      val: 3
    });
    links.push({ source: `area-${note.area}`, target: note.id, strength: 0.75 });
  }

  for (const area of areas) {
    const areaNotes = notes.filter((note) => note.area === area);
    for (let index = 0; index < areaNotes.length - 1; index += 1) {
      links.push({
        source: areaNotes[index].id,
        target: areaNotes[index + 1].id,
        strength: 0.34
      });
    }
  }

  return { nodes, links };
}
