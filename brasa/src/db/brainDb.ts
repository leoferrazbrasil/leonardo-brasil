import Dexie, { type Table } from 'dexie';
import { createNoteId } from '../lib/memoryTag';
import { initialNotes } from '../lib/initialNotes';
import type { BrainNote, SaveTagPayload } from '../types/brain';

class BrasaBrainDatabase extends Dexie {
  notes!: Table<BrainNote, string>;

  constructor() {
    super('brasa-second-brain');
    this.version(1).stores({
      notes: 'id, area, updatedAt'
    });
  }
}

export const brainDb = new BrasaBrainDatabase();

export async function seedInitialNotes(): Promise<BrainNote[]> {
  const count = await brainDb.notes.count();
  if (count === 0) {
    await brainDb.notes.bulkPut(initialNotes);
  }

  return brainDb.notes.orderBy('updatedAt').toArray();
}

export async function getAllNotes(): Promise<BrainNote[]> {
  return brainDb.notes.orderBy('updatedAt').toArray();
}

export async function upsertNote(note: BrainNote): Promise<BrainNote> {
  const updated = { ...note, updatedAt: new Date().toISOString() };
  await brainDb.notes.put(updated);
  return updated;
}

export async function saveMemoryFromTag(payload: SaveTagPayload): Promise<BrainNote> {
  const createdAt = new Date();
  const note: BrainNote = {
    id: createNoteId(payload.area, payload.title, createdAt),
    title: payload.title,
    area: payload.area,
    content: payload.content,
    createdAt: createdAt.toISOString(),
    updatedAt: createdAt.toISOString()
  };

  await brainDb.notes.put(note);
  return note;
}
