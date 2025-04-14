import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import Head from 'next/head';

const CategoryPage: NextPage = () => {
  const router = useRouter();
  const routedTopic = router.query.topic?.toString();

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
        <h2>{routedTopic}</h2>
      </main>
    </>
  );
};

export default CategoryPage;
