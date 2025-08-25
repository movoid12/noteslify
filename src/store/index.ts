import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { type NoteSlice, createNoteSlice } from './note-slice';
import { type TopicSlice, createTopicSlice } from './topic-slice';

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
