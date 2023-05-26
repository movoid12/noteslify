/* eslint-disable @typescript-eslint/await-thenable */
import { create } from 'zustand';

export type Topic = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  userId: string;
};

export type Note = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  topicId: string;
};

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
