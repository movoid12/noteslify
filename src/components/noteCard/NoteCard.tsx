/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { useStyles } from "../../utils/MarkdownConfig";
import { ActionIcon, Badge, Button, Group, Paper, Stack, Title } from "@mantine/core";

import { IconTrash } from "@tabler/icons-react";
import { useTopicStore, useNoteStore } from "~/utils/store";
import { useTopicLogic } from "~/helpers/helpers";

import React from "react";

import { useRouter } from "next/router";

export const NoteCard = () => {
  const selectedTopic = useTopicStore((state) => state.selectedTopic);

  const selectedNote = useNoteStore((state) => state.selectedNote);
  const setSelectedNote = useNoteStore((state) => state.setSelectedNote);
  const { notes, deleteNote } = useTopicLogic();
  const { classes } = useStyles();

  const router = useRouter();

  const handleRoute = () => {
    void router.push(`/topics/${selectedTopic?.title}/notes/${selectedNote?.title}`);
  };

  return (
    <Stack>
      {/* <LoadingOverlay visible={dataLoading} overlayBlur={2} /> */}
      {notes?.map((note) => (
        <Paper
          key={note.id}
          onClick={() => {
            setSelectedNote(note);
          }}
          variant="filled"
          className={classes.root}
          withBorder
          p="md"
        >
          <Group position="apart">
            <Title order={3} m="md">
              {note.title}
            </Title>
            <Button color="blue" onClick={handleRoute}>
              Open note
            </Button>
          </Group>
          <Group position="apart">
            <Badge m={"sm"} color="teal" variant="outline">
              created: {note.createdAt.toLocaleDateString()} -{" "}
              {note.createdAt.toLocaleTimeString()}
            </Badge>
            <ActionIcon
              mr={"md"}
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
