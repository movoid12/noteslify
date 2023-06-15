import { Loader } from '@mantine/core';
import { useHelpers } from '~/helpers/useHelpers';

const LoadingSpinnerNotes = () => {
  const { noteIsLoading } = useHelpers();

  return <div>{noteIsLoading && <Loader />}</div>;
};

const LoadingSpinnerTopics = () => {
  const { topicIsLoading } = useHelpers();

  return <div>{topicIsLoading && <Loader />}</div>;
};

export { LoadingSpinnerNotes, LoadingSpinnerTopics };
