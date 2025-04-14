import { Divider, Group, Title } from '@mantine/core';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

import BackButton from '~/components/BackButton/BackButton';
import PageLayout from '~/components/layouts/page-layout';

import markdownConf from '~/utils/MarkdownConfig';
import { useNoteStore } from '~/utils/store';

export default function NotePage() {
  const selectedNote = useNoteStore((state) => state.selectedNote);

  const router = useRouter();

  const topicMeta = router.query.topic?.toString() || '';

  const noteMeta = router.query.id?.toString() || '';

  // const [topic, setTopic] = useState();
  // const [note, setNote] = useState();

  // useEffect(() => {

  //   async function init() {

  //     const topicFromApi = api.topic.getById(topicId);
  //     const noteFromApi = api.note.getById(noteId);

  //     setTopic(topicFromApi)
  //     setNote(noteFromApi)
  //   }

  // }, [topicId, noteId ])

  if (selectedNote === null) {
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
    </>
  );
}
