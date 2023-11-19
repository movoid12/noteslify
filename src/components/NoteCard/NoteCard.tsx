/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useState } from 'react';
import {
  ActionIcon,
  Badge,
  Button,
  Center,
  Container,
  Group,
  Modal,
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { IconTrash } from '@tabler/icons-react';

import { useTopicStore, useNoteStore, type Note } from '~/utils/store';
import { useHelpers } from '~/hooks/useHelpers';
import { useStyles } from '../../utils/MarkdownConfig';
import { LoadingSpinnerNotes } from '~/components/LoadingSpinner/LoadingSpinner';

dayjs.extend(relativeTime);

export const NoteCard = () => {
  const { classes } = useStyles();

  const router = useRouter();

  const { notes, deleteNote } = useHelpers();

  const [isModalOpen, setModalOpen] = useState(false);

  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);

  const selectedTopic = useTopicStore((state) => state.selectedTopic);

  const { setSelectedNote } = useNoteStore((state) => state);

  const handleDelete = (id: string) => {
    setNoteToDelete(id);
    setModalOpen(true);
  };

  const confirmDeletion = () => {
    if (noteToDelete) {
      deleteNote.mutate({ id: noteToDelete });
    }
    setModalOpen(false);
  };

  const cancelDeletion = () => {
    setModalOpen(false);
  };

  const handleRoute = (reqNote: Note) => {
    setSelectedNote(reqNote);
    void router.push(`/topics/${selectedTopic?.title}/notes/${reqNote.title}`);
  };

  return (
    <Stack>
      <Center>
        <LoadingSpinnerNotes />
      </Center>
      {notes?.map((note) => (
        <Paper key={note.id} variant="filled" className={classes.root} withBorder p="md">
          <Group position="apart">
            <Title order={3} m="md">
              {note.title}
            </Title>
            <Button
              color="blue"
              onClick={() => {
                handleRoute(note);
              }}
            >
              Open note
            </Button>
          </Group>
          <Group position="apart">
            <Tooltip
              position="bottom-end"
              color="blue"
              radius="xl"
              arrowPosition="center"
              withArrow
              openDelay={300}
              style={{ fontSize: 12 }}
              label={`${note.createdAt.toLocaleDateString()} ${note.createdAt.toLocaleTimeString()}`}
            >
              <Badge m={'sm'} color="teal" variant="outline">
                {dayjs(note.createdAt).fromNow()}
              </Badge>
            </Tooltip>
            <ActionIcon
              mr="md"
              color="red"
              variant="outline"
              onClick={() => handleDelete(note.id)}
            >
              <IconTrash />
            </ActionIcon>
            <Modal
              opened={isModalOpen}
              onClose={cancelDeletion}
              title="Confirm deletion"
              size="xs"
            >
              <Stack>
                <Group position="center">
                  <Text>Are you sure you want to delete this note?</Text>
                </Group>
                <Group spacing="xl" grow>
                  <Button onClick={confirmDeletion} color="red">
                    Yes
                  </Button>
                  <Button onClick={cancelDeletion}>No</Button>
                </Group>
              </Stack>
            </Modal>
          </Group>
        </Paper>
      ))}
    </Stack>
  );
};
