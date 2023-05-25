import { Divider, Group, Title } from "@mantine/core";
import { type NextPage } from "next";
import Head from "next/head";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import BackButton from "~/components/BackButton/BackButton";
import { PageLayout } from "~/components/PageLayout";
import MarkdownConfig from "~/utils/MarkdownConfig";
import { useNoteStore, useTopicStore } from "~/utils/store";

const NotePage: NextPage = () => {
  const selectedNote = useNoteStore((state) => state.selectedNote);
  const selectedTopic = useTopicStore((state) => state.selectedTopic);

  if (selectedNote === null) {
    return null;
  }
  if (selectedTopic === null) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Noteslify App</title>
        <meta
          name="description"
          content="Noteslify an app that makes your more creative to make"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <Group position="apart" mb="md">
          <Title color="yellow" order={5}>Topic: {selectedTopic.title}</Title>
          <Title order={2}>{selectedNote.title}</Title>
          <BackButton />
        </Group>
        <Divider size="lg"/>
        <ReactMarkdown
          components={MarkdownConfig}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        >
          {selectedNote.content}
        </ReactMarkdown>
      </PageLayout>
    </>
  );
};

export default NotePage;
