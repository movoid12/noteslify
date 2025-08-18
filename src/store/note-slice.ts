import type { StateCreator } from 'zustand';

export type Note = {
  id: string;
  createdAt: Date | string | null;
  updatedAt: Date | string | null;
  title: string;
  content: string;
  topicId: string;
};

export interface NoteSlice {
  selectedNote: Note | null;
  setSelectedNote: (note: Note | null) => void;
  clearSelectedNote: () => void;
}

export const createNoteSlice: StateCreator<NoteSlice> = (set) => ({
  selectedNote: null,
  setSelectedNote: (note) => set({ selectedNote: note }),
  clearSelectedNote: () => set({ selectedNote: null }),
});
