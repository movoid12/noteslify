/* eslint-disable @typescript-eslint/await-thenable */
import { create } from "zustand";

import { type RouterOutputs } from "~/utils/api";

type Topic = RouterOutputs["topic"]["getAll"][0];

type Note = RouterOutputs["note"]["getAll"][0];

type TopicStore = {
  selectedTopic: Topic | null;
  setSelectedTopic: (topic: Topic | null) => void;
};

type NoteStore = {
  selectedNote: Note | null;
  setSelectedNote: (note: Note | null) => void;
};

export const useTopicStore = create<TopicStore>((set) => ({
  selectedTopic: null,
  setSelectedTopic: (topic) => set({ selectedTopic: topic }),
}));

export const useNoteStore = create<NoteStore>((set) => ({
  selectedNote: null,
  setSelectedNote: (note) => set({ selectedNote: note }),
}));
