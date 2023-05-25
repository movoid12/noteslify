/* eslint-disable @typescript-eslint/unbound-method */
import { type NextPage } from "next";
import Head from "next/head";
import React from "react";

import NoteEditor from "~/components/NoteEditor/NoteEditor";
import { NoteCard } from "~/components/NoteCard/NoteCard";
import { PageLayout } from "~/components/PageLayout";

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
