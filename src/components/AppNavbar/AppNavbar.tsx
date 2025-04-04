import {
  ActionIcon,
  Button,
  Container,
  Divider,
  Group,
  Input,
  Modal,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import { useTopicStore } from '~/utils/store';
import { useHelpers } from '~/hooks/useHelpers';
import { IconEdit, IconX } from '@tabler/icons-react';
import { LoadingSpinnerTopics } from '../LoadingSpinner/LoadingSpinner';
import ConfirmModal from '../ConfirmModal/ConfirmModal';

const AppNavbar: React.FC = () => {
  const { createTopic, topics, deleteTopic, updateTopic, sessionData } =
    useHelpers();

  const { selectedTopic, setSelectedTopic } = useTopicStore((state) => ({
    selectedTopic: state.selectedTopic,
    setSelectedTopic: state.setSelectedTopic,
  }));

  const [opened, { open, close }] = useDisclosure(false);

  // * new topic

  const [newTopic, setNewTopic] = useState('');

  const handleCreateTopic = () => {
    createTopic.mutate({ title: newTopic });
    setNewTopic('');
  };

  // * delete topic

  const [isModalOpen, setModalOpen] = useState(false);
  const [topicToDelete, setTopicToDelete] = useState<string | null>(null);

  const handleDeleteTopic = (id: string) => {
    setTopicToDelete(id);
    setModalOpen(true);
  };

  const confirmDeletion = () => {
    if (topicToDelete) {
      deleteTopic.mutate({ id: topicToDelete });
    }
    setModalOpen(false);
  };

  const cancelDeletion = () => {
    setModalOpen(false);
  };

  // * edit topic

  const [tempTopic, setTempTopic] = useState('');

  const [editingTopicId, setEditingTopicId] = useState('');

  const handleEditTopic = (id: string) => {
    setEditingTopicId(id);

    const topic = topics?.find((topic) => topic.id === id);

    if (topic) {
      setTempTopic(topic.title);
    }
  };

  const handleUpdateItem = (id: string) => {
    updateTopic.mutate({ id, title: tempTopic });
    handleFormReset();
  };

  // * reset form

  const handleFormReset = () => {
    setEditingTopicId('');
    setTempTopic('');
  };

  // * render

  const topicsCount = topics?.length;

  return (
    <Stack>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={cancelDeletion}
        title="Confirm deletion"
        confirmAction={confirmDeletion}
        cancelAction={cancelDeletion}
        message="Are you sure you want to delete this topic?"
      />
      <Text>To add new Topic:</Text>
      <Input
        variant="filled"
        disabled={sessionData?.user === undefined}
        placeholder={
          sessionData?.user === undefined
            ? 'Sign in to add topic'
            : 'Add a new topic'
        }
        radius="xl"
        size="md"
        value={newTopic}
        onChange={(e) => {
          setNewTopic(e.currentTarget.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleCreateTopic;
          }
        }}
      />
      <Button
        onClick={handleCreateTopic}
        disabled={sessionData?.user === undefined || newTopic === ''}
      >
        Add Topic
      </Button>
      <Button onClick={open} disabled={sessionData?.user === undefined}>
        Manage Topics
      </Button>
      <Divider />
      <Modal
        opened={opened}
        onClose={() => {
          handleFormReset();
          close();
        }}
        title="Manage Topics"
      >
        <Container>
          {topics?.map((topic) => (
            <div key={topic.id}>
              <Group mb="sm" mt="sm" position="apart">
                {editingTopicId === topic.id ? (
                  <>
                    <Input
                      onChange={(e) => setTempTopic(e.currentTarget.value)}
                      value={tempTopic}
                      rightSection={
                        <IconX onClick={handleFormReset} cursor="pointer" />
                      }
                    />
                    <Button onClick={() => handleUpdateItem(topic.id)}>
                      Update
                    </Button>
                  </>
                ) : (
                  <>
                    <ActionIcon
                      onClick={() => {
                        setEditingTopicId(topic.id);
                        handleEditTopic(topic.id);
                      }}
                    >
                      <IconEdit />
                    </ActionIcon>
                    <Text size="sm">{topic.title}</Text>
                    <Button
                      onClick={() => handleDeleteTopic(topic.id)}
                      variant="outline"
                    >
                      Delete
                    </Button>
                  </>
                )}
              </Group>
              <Divider />
            </div>
          ))}
        </Container>
      </Modal>
      <Group position="apart">
        <Text>Select a Topic:</Text>
        <Text fz={12}>{topicsCount} Topics</Text>
      </Group>
      <LoadingSpinnerTopics />
      {topics?.map((topic) => (
        <Paper
          withBorder
          bg={selectedTopic?.id === topic.id ? '#d2c293a3' : ''}
          onClick={(evt) => {
            evt.preventDefault();
            setSelectedTopic(topic);
          }}
          key={topic.id}
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
            textAlign: 'center',
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[5]
                  : theme.colors.gray[1],
            },
          })}
        >
          <Text>{topic.title}</Text>
        </Paper>
      ))}
    </Stack>
  );
};

export default AppNavbar;
