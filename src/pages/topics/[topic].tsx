import { type NextPage } from 'next';
import Head from 'next/head';
import { useTopicStore } from '~/utils/store';

const CategoryPage: NextPage = () => {
  const selectedTopic = useTopicStore((state) => state.selectedTopic);

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
      <main>
        <h1>Category Page</h1>
        <h2>{selectedTopic?.title}</h2>
      </main>
    </>
  );
};

export default CategoryPage;
