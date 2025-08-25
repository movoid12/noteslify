import type { StateCreator } from 'zustand';

export type Topic = {
  id: string;
  createdAt: Date | string | null;
  updatedAt: Date | string | null;
  title: string;
  userId: string;
};

export interface TopicSlice {
  selectedTopic: Topic | null;
  setSelectedTopic: (topic: Topic | null) => void;
  clearSelectedTopic: () => void;
}

export const createTopicSlice: StateCreator<TopicSlice> = (set) => ({
  selectedTopic: null,
  setSelectedTopic: (topic) => set({ selectedTopic: topic }),
  clearSelectedTopic: () => set({ selectedTopic: null }),
});
