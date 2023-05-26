import { api } from '~/utils/api';
import { useSession } from 'next-auth/react';

import { type Topic, useTopicStore, type Note } from '~/utils/store';

type useHelpersProps = {
  topics: Topic[];
  createTopic: ReturnType<typeof api.topic.create.useMutation>;
  deleteTopic: ReturnType<typeof api.topic.delete.useMutation>;
  updateTopic: ReturnType<typeof api.topic.update.useMutation>;
  sessionData: ReturnType<typeof useSession>['data'];
  createNote: ReturnType<typeof api.note.create.useMutation>;
  deleteNote: ReturnType<typeof api.note.delete.useMutation>;
  updateNote: ReturnType<typeof api.note.update.useMutation>;
  notes: Note[];
  noteIsLoading: boolean;
  topicIsLoading: boolean;
};

const useHelpers = (): useHelpersProps => {
  const selectedTopic = useTopicStore((state) => state.selectedTopic);
  const setSelectedTopic = useTopicStore((state) => state.setSelectedTopic);

  const { data: sessionData } = useSession();

  const { data: topics, refetch: refetchTopics, isLoading: topicIsLoading } = api.topic.getAll.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
    onSuccess: (data) => {
      setSelectedTopic(selectedTopic ?? data[0] ?? null);
    },
  });

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      void refetchTopics();
    },
  });
  const deleteTopic = api.topic.delete.useMutation({
    onSuccess: () => {
      void refetchTopics();
    },
  });
  const updateTopic = api.topic.update.useMutation({
    onSuccess: () => {
      void refetchTopics();
    },
  });

  const { data: notes, refetch: refetchNotes, isLoading: noteIsLoading } = api.note.getAll.useQuery(
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
