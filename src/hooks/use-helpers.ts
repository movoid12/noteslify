import { useSession } from '~/lib/clients';
import { useTopicStore } from '~/store';
import { api } from '~/utils/api';

const useHelpers = () => {
  const { selectedTopic, setSelectedTopic } = useTopicStore();

  const { data: sessionData } = useSession();

  const {
    data: topics,
    refetch: refetchTopics,
    isLoading: topicIsLoading,
  } = api.topic.getAll.useQuery(undefined, {
    enabled: !!sessionData?.user,
    select: (data) => {
      if (data && data.length > 0 && !selectedTopic) {
        setSelectedTopic(data[0] ?? null);
      }
      return data;
    },
  });

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      refetchTopics();
    },
    onError: (error) => {
      console.error('Error creating topic:', error);
    },
  });

  const deleteTopic = api.topic.delete.useMutation({
    onSuccess: () => {
      refetchTopics();
    },
    onError: (error) => {
      console.error('Error deleting topic:', error);
    },
  });

  const updateTopic = api.topic.update.useMutation({
    onSuccess: () => {
      refetchTopics();
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
      refetchNotes();
    },
  });

  const deleteNote = api.note.delete.useMutation({
    onSuccess: () => {
      refetchNotes();
    },
  });

  const updateNote = api.note.update.useMutation({
    onSuccess: () => {
      refetchNotes();
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
