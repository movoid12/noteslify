/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { useStyles } from "../../utils/MarkdownConfig";
import { Accordion, ActionIcon, Badge, Group, Paper, Stack, Text } from "@mantine/core";

import { api } from "~/utils/api";
import { IconExternalLink, IconNote, IconTrash } from "@tabler/icons-react";
import { useTopicStore, useNoteStore } from "~/utils/store";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import Link from "next/link";

export const NoteCard = () => {
  const selectedTopic = useTopicStore((state) => state.selectedTopic);

  const selectedNote = useNoteStore((state) => state.selectedNote);
  const setSelectedNote = useNoteStore((state) => state.setSelectedNote);

  const { data: sessionData } = useSession();

  const { data: notes, refetch: refetchNotes } = api.note.getAll.useQuery(
    { topicId: selectedTopic?.id ?? "" },
    {
      enabled: sessionData?.user !== undefined && selectedTopic !== null,
    },
  );

  const deleteNote = api.note.delete.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  const { classes } = useStyles();
  return (
    <Stack>
      {/* <LoadingOverlay visible={dataLoading} overlayBlur={2} /> */}
      {notes?.map((note) => (
        <Paper withBorder key={note.id}>
          <Accordion variant="filled" classNames={classes} className={classes.root}>
            <Accordion.Item
              value={note.title}
              onClick={() => {
                setSelectedNote(note);
              }}
            >
              <Group position="right">
                <Accordion.Control icon={<IconNote />}>{note.title}</Accordion.Control>

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
                <ActionIcon mr={"md"} color="blue" variant="outline">
                  <Link

                    href={`/topics/${selectedTopic?.title}/notes/${note?.title}`}
                  >
                    <IconExternalLink />
                  </Link>
                </ActionIcon>
              </Group>
              <Accordion.Panel>
                <Text size="md">open to see your note content</Text>
              </Accordion.Panel>
              <Badge m={"sm"} color="teal" variant="outline">
                created: {note.createdAt.toLocaleDateString()} -{" "}
                {note.createdAt.toLocaleTimeString()}
              </Badge>
            </Accordion.Item>
          </Accordion>
        </Paper>
      ))}
    </Stack>
  );
};
