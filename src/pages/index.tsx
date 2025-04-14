import type { NextPage } from 'next';
import Head from 'next/head';

import { NoteCard } from '~/components/NoteCard/NoteCard';
import NoteEditor from '~/components/NoteEditor/NoteEditor';
import PageLayout from '~/components/layouts/page-layout';

const Home: NextPage = () => {
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
      <PageLayout withNavbar>
        <NoteEditor onSave={(note) => console.log(note)} />
        <NoteCard />
      </PageLayout>
    </>
  );
};

export default Home;
