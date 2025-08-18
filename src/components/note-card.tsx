import {
  ActionIcon,
  Badge,
  Button,
  Center,
  Group,
  Loader,
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

import { useStyles } from '~/hooks/use-styles';
import { useNoteStore, useTopicStore } from '~/store';
import type { Note } from '~/store/note-slice';
import ConfirmModal from './modals/confirm-modal';

dayjs.extend(relativeTime);

export default function NoteCard() {
  const { classes } = useStyles();

  const router = useRouter();

  const { notes, deleteNote } = useHelpers();

  const [isModalOpen, setModalOpen] = useState(false);

  const [noteId, setNoteId] = useState<string | null>(null);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  const { selectedTopic } = useTopicStore();

  const { setSelectedNote } = useNoteStore();

  const handleDelete = (id: string) => {
    setNoteId(id);
    setModalOpen(true);
  };

  const handleDeleteModel = async () => {
    if (!noteId) {
      setModalOpen(false);
      return;
    }
    const id = noteId;
    setIsDeletingId(id);

    try {
      await deleteNote.mutateAsync({ id });
    } catch (error) {
      console.error('Failed to delete note', error);
    } finally {
      setIsDeletingId(null);
      setNoteId(null);
      setModalOpen(false);
    }
  };

  const cancelDeletion = () => {
    setModalOpen(false);
  };

  const handleRoute = (reqNote: Note) => {
    if (!selectedTopic) {
      setSelectedNote(reqNote);
      console.warn('No selected topic — navigation skipped');
      return;
    }

    setSelectedNote(reqNote);

    const topicSlug = encodeURIComponent(selectedTopic.title);
    const noteSlug = encodeURIComponent(reqNote.title);
    void router.push(`/topics/${topicSlug}/notes/${noteSlug}`);
  };

  return (
    <Stack>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={cancelDeletion}
        title="Confirm deletion of Note"
        confirmAction={handleDeleteModel}
        cancelAction={cancelDeletion}
        message="Are you sure you want to delete this note?"
      />
      <Center>
        <LoadingSpinnerNotes />
      </Center>

      {notes && notes.length === 0 && (
        <Center>
          <Title order={4} color="dimmed">
            No notes yet
          </Title>
        </Center>
      )}

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
              openDelay={300}
              style={{ fontSize: 11 }}
              label={
                note.createdAt
                  ? note.createdAt.toLocaleString()
                  : 'Unknown date'
              }
            >
              <Badge m={'sm'} color="teal" variant="outline">
                {note.createdAt ? dayjs(note.createdAt).fromNow() : 'Unknown'}
              </Badge>
            </Tooltip>
            <ActionIcon
              mr="md"
              color="red"
              variant="outline"
              onClick={() => handleDelete(note.id)}
              aria-label={`Delete ${note.title}`}
              aria-busy={isDeletingId === note.id}
              disabled={isDeletingId !== null}
            >
              {isDeletingId === note.id ? <Loader size="xs" /> : <IconTrash />}
            </ActionIcon>
          </Group>
        </Paper>
      ))}
    </Stack>
  );
}
