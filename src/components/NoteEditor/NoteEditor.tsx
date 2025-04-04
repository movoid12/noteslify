import { useState } from 'react';
import { Button, Input, Mark, Space, Stack, Tabs, Text } from '@mantine/core';
import { useEditor } from '@tiptap/react';
import { RichTextEditor, Link } from '@mantine/tiptap';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import CodeMirror from '@uiw/react-codemirror';
import { IconMarkdown, IconNotes } from '@tabler/icons-react';

import { useHelpers } from '~/hooks/useHelpers';
import { useTopicStore } from '~/utils/store';

type NoteEditorProps = {
  onSave: (note: { title: string; content: string }) => void;
};
const NoteEditor = ({ onSave }: NoteEditorProps) => {
  const selectedTopic = useTopicStore((state) => state.selectedTopic);

  const [noteContent, setNoteContent] = useState<string>('');

  const [title, setTitle] = useState<string>('');

  const { createNote, sessionData } = useHelpers();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Color,
    ],
    content: noteContent,
    onUpdate: ({ editor }) => {
      setNoteContent(editor.getHTML());
    },
  });

  const pickColors = [
    '#25262b',
    '#868e96',
    '#fa5252',
    '#e64980',
    '#be4bdb',
    '#7950f2',
    '#4c6ef5',
    '#228be6',
    '#15aabf',
    '#12b886',
    '#40c057',
    '#82c91e',
    '#fab005',
    '#fd7e14',
  ];

  const clearHandleClick = () => {
    if (!editor) {
      return null;
    }
    editor.commands.clearContent();
  };

  return (
    <Stack spacing="md">
      <Text size="lg" weight={700}>
        Selected Topic:{' '}
        <Mark>
          {' '}
          {selectedTopic?.title ?? 'Select a topic to create a note'}
        </Mark>
      </Text>
      <Text>Add your note title:</Text>
      <Input
        required
        placeholder={
          sessionData?.user === undefined
            ? 'Sign in to create a note'
            : 'Title*'
        }
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        disabled={sessionData?.user === undefined}
      />
      <Tabs color="teal" defaultValue="richtext">
        <Tabs.List
          grow
          onClick={() => {
            setNoteContent('');
            clearHandleClick();
          }}
        >
          <Tabs.Tab value="richtext" icon={<IconNotes size="0.8rem" />}>
            Text Editor
          </Tabs.Tab>
          <Tabs.Tab value="markdown" icon={<IconMarkdown size="0.8rem" />}>
            Markdown Editor
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="markdown">
          <CodeMirror
            value={noteContent}
            editable={sessionData?.user === undefined ? false : true}
            readOnly={sessionData?.user === undefined ? true : false}
            width="auto"
            height="30vh"
            minWidth="100%"
            minHeight="30vh"
            extensions={[
              markdown({ base: markdownLanguage, codeLanguages: languages }),
            ]}
            onChange={(value: string) => setNoteContent(value)}
          />
        </Tabs.Panel>
        <Tabs.Panel value="richtext">
          <RichTextEditor
            editor={editor}
            h={'35vh'}
            style={{ overflowY: 'auto' }}
          >
            <RichTextEditor.Toolbar sticky>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.ColorPicker colors={pickColors} />
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
            {sessionData?.user !== undefined ? (
              <RichTextEditor.Content mih={'30vh'} />
            ) : null}
          </RichTextEditor>
        </Tabs.Panel>
      </Tabs>
      <Space />
      <Button
        color="green"
        radius="lg"
        uppercase
        variant="filled"
        onClick={() => {
          createNote.mutate({
            title,
            content: noteContent,
            topicId: selectedTopic?.id ?? '',
          });
          onSave({ title, content: noteContent });
          setTitle('');
          setNoteContent('');
          clearHandleClick();
        }}
        disabled={
          title.trim().length === 0 ||
          noteContent.trim().length === 0 ||
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
