import {
  ActionIcon,
  Badge,
  Button,
  Center,
  Group,
  Paper,
  Stack,
  Title,
  Tooltip,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { LoadingSpinnerNotes } from '~/components/loading-spinner/loading-spinner';
import { useHelpers } from '~/hooks/use-helpers';
import { type Note, useNoteStore, useTopicStore } from '~/utils/store';
import { useStyles } from '../utils/markdown-config';
import ConfirmModal from './modals/confirm-modal';

dayjs.extend(relativeTime);

export default function NoteCard() {
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
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={cancelDeletion}
        title="Confirm deletion of Note"
        confirmAction={confirmDeletion}
        cancelAction={cancelDeletion}
        message="Are you sure you want to delete this note?"
      />
      <Center>
        <LoadingSpinnerNotes />
      </Center>
      {notes?.map((note) => (
        <Paper
          key={note.id}
          variant="filled"
          className={classes.root}
          withBorder
          p="md"
        >
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
              label={
                note.createdAt
                  ? ` (${dayjs(note.createdAt).format('llll')}`
                  : 'Unknown date'
              }
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
          </Group>
        </Paper>
      ))}
    </Stack>
  );
}
