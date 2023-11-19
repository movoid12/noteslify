/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
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
import { useRouter } from 'next/router';
import { IconTrash } from '@tabler/icons-react';

import { useTopicStore, useNoteStore, type Note } from '~/utils/store';
import { useHelpers } from '~/helpers/useHelpers';
import { useStyles } from '../../utils/MarkdownConfig';
import { LoadingSpinnerNotes } from '~/components/LoadingSpinner/LoadingSpinner';

dayjs.extend(relativeTime);

export const NoteCard = () => {
  const selectedTopic = useTopicStore((state) => state.selectedTopic);
  const { setSelectedNote } = useNoteStore((state) => state);

  const { notes, deleteNote } = useHelpers();

  const { classes } = useStyles();

  const router = useRouter();

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
              onClick={() => {
                deleteNote.mutate({ id: note.id });
              }}
            >
              <IconTrash />
            </ActionIcon>
          </Group>
        </Paper>
      ))}
    </Stack>
  );
};
