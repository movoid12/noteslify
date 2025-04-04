import { useSession } from 'next-auth/react';
import { api } from '~/utils/api';

import { type Note, type Topic, useTopicStore } from '~/utils/store';

type Helpers = {
  topics: Topic[];
  createTopic: ReturnType<typeof api.topic.create.useMutation>;
  deleteTopic: ReturnType<typeof api.topic.delete.useMutation>;
  updateTopic: ReturnType<typeof api.topic.update.useMutation>;
  sessionData: ReturnType<typeof useSession>['data'];
  createNote: ReturnType<typeof api.note.create.useMutation>;
  deleteNote: ReturnType<typeof api.note.delete.useMutation>;
  updateNote: ReturnType<typeof api.note.update.useMutation>;
  notes: Note[];
  noteIsLoading?: boolean;
  topicIsLoading?: boolean;
};

const useHelpers = (): Helpers => {
  const selectedTopic = useTopicStore((state) => state.selectedTopic);
  const setSelectedTopic = useTopicStore((state) => state.setSelectedTopic);

  const { data: sessionData } = useSession();

  const {
    data: topics,
    refetch: refetchTopics,
    isInitialLoading: topicIsLoading,
  } = api.topic.getAll.useQuery(undefined, {
    enabled: !!sessionData?.user,
    onSuccess: (data) => {
      if (!selectedTopic && data.length > 0 && data[0] !== undefined) {
        setSelectedTopic(data[0]);
      }
    },
    onError: (error) => {
      console.error('Error fetching topics:', error);
    },
  });

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      void refetchTopics();
    },
    onError: (error) => {
      console.error('Error creating topic:', error);
    },
  });

  const deleteTopic = api.topic.delete.useMutation({
    onSuccess: () => {
      void refetchTopics();
    },
    onError: (error) => {
      console.error('Error deleting topic:', error);
    },
  });

  const updateTopic = api.topic.update.useMutation({
    onSuccess: () => {
      void refetchTopics();
    },
    onError: (error) => {
      console.error('Error updating topic:', error);
    },
  });

  const {
    data: notes,
    refetch: refetchNotes,
    isInitialLoading: noteIsLoading,
  } = api.note.getAll.useQuery(
    { topicId: selectedTopic?.id ?? '' },
    {
      enabled: sessionData?.user !== undefined && selectedTopic !== null,
    },
  );

  const createNote = api.note.create.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  const deleteNote = api.note.delete.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  const updateNote = api.note.update.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  return {
    topics: topics ?? [],
    createTopic,
    deleteTopic,
    updateTopic,
    sessionData,
    createNote,
    deleteNote,
    updateNote,
    notes: notes ?? [],
    noteIsLoading,
    topicIsLoading,
  };
};

export { useHelpers };
