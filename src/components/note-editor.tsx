'use client';

import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import {
  Button,
  Grid,
  Input,
  Mark,
  Space,
  Stack,
  Tabs,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { Link, RichTextEditor } from '@mantine/tiptap';
import { IconMarkdown, IconNotes } from '@tabler/icons-react';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeMirror from '@uiw/react-codemirror';
import { useState } from 'react';

import { useHelpers } from '~/hooks/use-helpers';
import { useTopicStore } from '~/store';
import { pickColors } from '~/utils/markdown-config';

export default function NoteEditor({
  onSave,
}: {
  onSave: (note: { title: string; content: string }) => void;
}) {
  const { selectedTopic } = useTopicStore();

  const [noteContent, setNoteContent] = useState('');

  const [title, setTitle] = useState('');

  const { createNote, sessionData } = useHelpers();

  const { colorScheme } = useMantineColorScheme();

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

  return (
    <Stack spacing="md">
      <Text size="lg" weight={700}>
        Selected Topic:{' '}
        <Mark>{selectedTopic?.title ?? 'Select a topic to create a note'}</Mark>
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(e.currentTarget.value)
        }
        disabled={sessionData?.user === undefined}
      />
      <Tabs color="teal" defaultValue="richtext">
        <Tabs.List grow>
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
            editable={Boolean(sessionData?.user)}
            readOnly={!sessionData?.user}
            theme={colorScheme === 'dark' ? 'dark' : 'light'}
            width="100%"
            height="35vh"
            basicSetup={{
              lineNumbers: true,
              foldGutter: true,
              dropCursor: false,
              allowMultipleSelections: false,
              indentOnInput: true,
              bracketMatching: true,
              closeBrackets: true,
              searchKeymap: true,
            }}
            extensions={[
              markdown({ base: markdownLanguage, codeLanguages: languages }),
            ]}
            onChange={(value: string) => setNoteContent(value)}
            placeholder={
              sessionData?.user === undefined
                ? 'Sign in to write markdown'
                : 'Write your markdown here...'
            }
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
      <Grid justify="space-around" align="center">
        <Grid.Col span={1}>
          <Button
            color="green"
            radius="lg"
            uppercase
            variant="filled"
            size="md"
            onClick={() => {
              createNote.mutate({
                title,
                content: noteContent,
                topicId: selectedTopic?.id ?? '',
              });
              onSave({ title, content: noteContent });
              setTitle('');
              setNoteContent('');
            }}
            disabled={
              title.trim().length === 0 ||
              noteContent.trim().length === 0 ||
              sessionData?.user === undefined
            }
          >
            Save
          </Button>
        </Grid.Col>
      </Grid>
      <Space />
    </Stack>
  );
}
