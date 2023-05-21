/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useState } from "react";
import { Button, Input, Mark, Space, Stack, Text } from "@mantine/core";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

import { useTopicStore } from "~/utils/store";
import { useEditor } from "@tiptap/react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";

const NoteEditor = ({
  onSave,
}: {
  onSave: (note: { title: string; content: string }) => void;
}) => {
  const { data: sessionData } = useSession();

  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const selectedTopic = useTopicStore((state) => state.selectedTopic);

  const { refetch: refetchNotes } = api.note.getAll.useQuery(
    { topicId: selectedTopic?.id ?? "" },
    {
      enabled: sessionData?.user !== undefined && selectedTopic !== null,
    },
  );

  const createNote = api.note.create.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyle,
      Color,
    ],
    content: code,
    onUpdate: ({ editor }) => {
      setCode(editor.getHTML());
    },
  });

  return (
    <Stack spacing="md">
      <Text size="lg" weight={700}>
        Selected Topic:{" "}
        <Mark> {selectedTopic?.title ?? "Select a topic to create a note"}</Mark>
      </Text>
      <Input
        placeholder={
          sessionData?.user === undefined ? "Sign in to create a note" : "Title"
        }
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        disabled={sessionData?.user === undefined}
      />
      {/* <CodeMirror
        value={code}
        editable={sessionData?.user === undefined ? false : true}
        readOnly={sessionData?.user === undefined ? true : false}
        width="auto"
        height="30vh"
        minWidth="100%"
        minHeight="30vh"
        extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
        onChange={(value) => setCode(value)}
      /> */}
      <RichTextEditor editor={editor} h={"35vh"} style={{ overflowY: "scroll" }}>
        <RichTextEditor.Toolbar sticky>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.ColorPicker
              colors={[
                "#25262b",
                "#868e96",
                "#fa5252",
                "#e64980",
                "#be4bdb",
                "#7950f2",
                "#4c6ef5",
                "#228be6",
                "#15aabf",
                "#12b886",
                "#40c057",
                "#82c91e",
                "#fab005",
                "#fd7e14",
              ]}
            />
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content mih={"30vh"} />
      </RichTextEditor>
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
          // editor.commands.clearContent();
        }}
        disabled={
          title.trim().length === 0 ||
          code.trim().length === 0 ||
          sessionData?.user === undefined
        }
      >
        Save
      </Button>
      <Space />
    </Stack>
  );
};

export default NoteEditor;
