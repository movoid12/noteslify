import { Loader } from '@mantine/core';
import { useHelpers } from '~/helpers/useHelpers';

const LoadingSpinnerNotes = () => {
  const { noteIsLoading, sessionData } = useHelpers();

  return <div>{noteIsLoading && sessionData && <Loader />}</div>;
};

const LoadingSpinnerTopics = () => {
  const { topicIsLoading, sessionData } = useHelpers();

  return <div>{topicIsLoading && sessionData && <Loader />}</div>;
};

export { LoadingSpinnerNotes, LoadingSpinnerTopics };
