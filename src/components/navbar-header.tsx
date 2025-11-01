import {
  ActionIcon,
  Button,
  Container,
  Divider,
  Group,
  Input,
  Modal,
  Stack,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { useHelpers } from '~/hooks/use-helpers';
import ConfirmModal from './modals/confirm-modal';

export default function NavbarHeader() {
  const [opened, { open, close }] = useDisclosure(false);

  const { createTopic, topics, deleteTopic, updateTopic, sessionData } =
    useHelpers();

  // * new topic

  const [newTopic, setNewTopic] = useState('');

  // * delete topic

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topicToDelete, setTopicToDelete] = useState<string | null>(null);

  const handleDeleteTopic = (id: string) => {
    setTopicToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDeletion = () => {
    if (topicToDelete) {
      deleteTopic.mutate({ id: topicToDelete });
    }
    setIsModalOpen(false);
  };

  const cancelDeletion = () => {
    setIsModalOpen(false);
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setNewTopic(e.currentTarget.value);
        }}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === 'Enter') {
            createTopic.mutate({ title: newTopic });
            setNewTopic('');
          }
        }}
      />
      <Button
        onClick={() => {
          createTopic.mutate({ title: newTopic });
          setNewTopic('');
        }}
        color="green"
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setTempTopic(e.currentTarget.value)
                      }
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
      <Divider />
    </Stack>
  );
}
