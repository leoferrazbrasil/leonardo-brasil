import type { BrainArea, SaveTagPayload } from '../types/brain';

const SAVE_TAG_PATTERN = /\[\[SAVE:([^|\]]+)\|([^|\]]+)\|([^\]]+?)\]\]/g;

export interface ParsedSaveTags {
  cleanText: string;
  saves: SaveTagPayload[];
}

export function parseSaveTags(text: string): ParsedSaveTags {
  const saves: SaveTagPayload[] = [];

  const cleanText = text
    .replace(SAVE_TAG_PATTERN, (_match, area, title, content) => {
      saves.push({
        area: area.trim() as BrainArea,
        title: title.trim(),
        content: content.trim()
      });

      return ' ';
    })
    .replace(/\s+([,.!?;:])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

  return { cleanText, saves };
}

export function createNoteId(area: BrainArea, title: string, createdAt = new Date()): string {
  const slug = `${area}-${title}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return `${slug}-${createdAt.getTime().toString(36)}`;
}
