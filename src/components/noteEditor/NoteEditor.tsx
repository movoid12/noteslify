/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useState } from "react";
import { Button, Input, Stack } from "@mantine/core";

import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";

const NoteEditor = ({
  onSave,
}: {
  onSave: (note: { title: string; content: string }) => void;
}) => {
  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  // const createNote = api.note.create.useMutation({
  //   onSuccess: () => {
  //     refetchNotes();
  //   },
  // });

  return (
    <Stack spacing="md">
      <Input
        placeholder="Insert a title for your note"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <CodeMirror
        value={code}
        width="auto"
        height="30vh"
        minWidth="100%"
        minHeight="30vh"
        extensions={[
          markdown({ base: markdownLanguage, codeLanguages: languages }),
        ]}
        onChange={(value) => setCode(value)}
        className="border border-gray-300"
      />

      <Button
        color="lime"
        radius="lg"
        uppercase
        variant="outline"
        onClick={() => {
          onSave({ title, content: code });
          setTitle("");
          setCode("");
        }}
      >
        Save
      </Button>
    </Stack>
  );
};

export default NoteEditor;
