import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createNoteSlice, type NoteSlice } from './note-slice';
import { createTopicSlice, type TopicSlice } from './topic-slice';

export const useAppStore = create<TopicSlice & NoteSlice>()(
  devtools(
    (...a) => ({
      ...createTopicSlice(...a),
      ...createNoteSlice(...a),
    }),
    {
      name: 'noteslify-store',
    },
  ),
);

export const useTopicStore = () =>
  useAppStore((state) => ({
    selectedTopic: state.selectedTopic,
    setSelectedTopic: state.setSelectedTopic,
    clearSelectedTopic: state.clearSelectedTopic,
  }));

export const useNoteStore = () =>
  useAppStore((state) => ({
    selectedNote: state.selectedNote,
    setSelectedNote: state.setSelectedNote,
    clearSelectedNote: state.clearSelectedNote,
  }));
