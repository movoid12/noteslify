/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/no-children-prop */
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MarkdownComponents, {useStyles} from "./MarkdownComponents";

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight, oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import {
  Accordion,
  ActionIcon,
  Badge,


  Group,

  Paper,
  Stack,
} from "@mantine/core";

import { api } from "~/utils/api";
import { IconNote, IconTrash } from "@tabler/icons-react";
import { useTopicStore } from "~/utils/store";
import { useSession } from "next-auth/react";
import React from "react";


export const NoteCard = () => {
  const selectedTopic = useTopicStore((state) => state.selectedTopic);
  const { data: sessionData } = useSession();

  const {
    data: notes,
    refetch: refetchNotes,
  } = api.note.getAll.useQuery(
    { topicId: selectedTopic?.id ?? "" },
    {
      enabled: sessionData?.user !== undefined && selectedTopic !== null,
    }
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
          <Accordion
            variant="filled"
            classNames={classes}
            className={classes.root}
          >
            <Accordion.Item value={note.title}>
              <Group position="right">
                <Accordion.Control  icon={<IconNote />}>
                  {note.title}
                </Accordion.Control>

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
              <Accordion.Panel>
                <ReactMarkdown components={MarkdownComponents} remarkPlugins={[remarkGfm]}>
                  {note.content}
                </ReactMarkdown>
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
