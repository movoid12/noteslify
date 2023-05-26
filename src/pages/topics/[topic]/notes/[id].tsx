import { Divider, Group, Title } from '@mantine/core';
import { type NextPage } from 'next';
import Head from 'next/head';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import BackButton from '~/components/BackButton/BackButton';
import { PageLayout } from '~/components/PageLayout';
import markdownConf from '~/utils/MarkdownConfig';
import { useNoteStore, useTopicStore } from '~/utils/store';


const NotePage: NextPage = () => {
  const selectedNote = useNoteStore((state) => state.selectedNote);
  const selectedTopic = useTopicStore((state) => state.selectedTopic);

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


  
  if (selectedNote === null || selectedTopic === null) {
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
          <Title order={2}>{selectedNote.title}</Title>
          <Title color="yellow" order={5}>
            Topic: {selectedTopic.title}
          </Title>
        </Group>
        <Divider size="lg" />
        <ReactMarkdown
          components={markdownConf}
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
