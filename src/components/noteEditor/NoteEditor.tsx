/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useState } from "react";
import { Button, Input, Space, Stack, Textarea } from "@mantine/core";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { useTopicStore } from "~/utils/store";

const NoteEditor = ({
  onSave,
}: {
  onSave: (note: { title: string; content: string }) => void;
}) => {
  const { data: sessionData } = useSession();

  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const selectedTopic = useTopicStore((state) => state.selectedTopic);

  const { data: notes, refetch: refetchNotes } = api.note.getAll.useQuery(
    { topicId: selectedTopic?.id ?? "" },
    {
      enabled: sessionData?.user !== undefined && selectedTopic !== null,
    }
  );

  const createNote = api.note.create.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  return (
    <Stack spacing="md">
      <Input
      placeholder={sessionData?.user === undefined ? "Sign in to create a note" : "Title"}
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        disabled={sessionData?.user === undefined}
      />
       <CodeMirror
        value={code}
        editable = { sessionData?.user === undefined ? false : true}
        readOnly = { sessionData?.user === undefined ? true : false}
        width="auto"
        height="30vh"
        minWidth="100%"
        minHeight="30vh"
        extensions={[
          markdown({ base: markdownLanguage, codeLanguages: languages }),
        ]}
        onChange={(value) => setCode(value)}
      /> 
      <Space />
      <Button
        color="green"
        radius="lg"
        uppercase
        variant="filled"
        onClick={() => {
          createNote.mutate({
            title,
            content: code,
            topicId: selectedTopic?.id ?? "",
          });
          onSave({ title, content: code });
          setTitle("");
          setCode("");
        }}
        disabled={title.trim().length === 0 || code.trim().length === 0 || sessionData?.user === undefined}
      >
        Save
      </Button>
      <Space />
    </Stack>
  );
};

export default NoteEditor;
