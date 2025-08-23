import Head from 'next/head';

import PageLayout from '~/components/layouts/page-layout';
import NoteCard from '~/components/note-card';
import NoteEditor from '~/components/note-editor';

export default function Home() {
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
}
