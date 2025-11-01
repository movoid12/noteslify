import { Paper, Stack, Text } from '@mantine/core';

import { useHelpers } from '~/hooks/use-helpers';

import { useTopicStore } from '~/store';
import { LoadingSpinnerTopics } from './loading-spinner/loading-spinner';

export default function AppNavbar() {
  const { topics } = useHelpers();

  const { selectedTopic, setSelectedTopic } = useTopicStore();

  return (
    <Stack>
      <LoadingSpinnerTopics />
      {topics?.map((topic) => (
        <Paper
          withBorder
          bg={selectedTopic?.id === topic.id ? '#fa932d5b' : ''}
          onClick={(evt: React.MouseEvent) => {
            evt.preventDefault();
            setSelectedTopic(topic);
          }}
          py="md"
          key={topic.id}
          sx={(theme) => ({
            padding: theme.spacing.xl,
            borderRadius: theme.radius.lg,
            textAlign: 'center',
            cursor: 'pointer',
          })}
        >
          <Text>{topic.title}</Text>
        </Paper>
      ))}
    </Stack>
  );
}
