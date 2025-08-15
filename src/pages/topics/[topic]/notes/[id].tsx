import { Divider, Group, Title } from '@mantine/core';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

import BackButton from '~/components/buttons/back-button';
import PageLayout from '~/components/layouts/page-layout';

import { markdownConf } from '~/utils/markdown-config';
import { useNoteStore } from '~/utils/store';

export default function NotePage() {
  const selectedNote = useNoteStore((state) => state.selectedNote);

  const router = useRouter();

  const topicMeta = router.query.topic?.toString() || '';

  const noteMeta = router.query.id?.toString() || '';

  if (selectedNote === null) {
    return null;
  }

  return (
    <main>
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
          <BackButton />
          <Title order={2}>{noteMeta}</Title>
          <Title color="yellow" order={5}>
            Topic: {topicMeta}
          </Title>
        </Group>
        <Divider size="lg" />
        <ReactMarkdown
          components={markdownConf}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
        >
          {selectedNote.content}
        </ReactMarkdown>
      </PageLayout>
    </main>
  );
}
