import { Loader } from '@mantine/core';
import { useEffect } from 'react';
import { useHelpers } from '~/helpers/useHelpers';

export const LoadingSpinner = () => {
  const { noteIsLoading, topicIsLoading } = useHelpers();

  return (
    <>
      {noteIsLoading && <Loader />}
      {topicIsLoading && <Loader />}
    </>
  );
};
