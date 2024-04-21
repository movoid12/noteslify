import { Divider, Group, Title } from '@mantine/core';
import { type NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

import BackButton from '~/components/BackButton/BackButton';
import { PageLayout } from '~/components/PageLayout';
import markdownConfig from '~/utils/MarkdownConfig';
import { useNoteStore } from '~/utils/store';

const NotePage: NextPage = () => {
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
          name='description'
          content='Noteslify an app that makes your more creative to make'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <PageLayout>
        <Group position='apart' mb='md'>
          <BackButton />
          <Title order={2}>{noteMeta}</Title>
          <Title color='yellow' order={5}>
            Topic: {topicMeta}
          </Title>
        </Group>
        <Divider size='lg' />
        <ReactMarkdown
          components={markdownConfig}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
        >
          {selectedNote.content}
        </ReactMarkdown>
      </PageLayout>
    </>
  );
};

export default NotePage;
