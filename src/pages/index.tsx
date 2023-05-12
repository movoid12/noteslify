/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/unbound-method */
import { type NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { api } from "~/utils/api";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";

import { useStore } from "~/utils/store";
import { HeaderContent } from "~/components/header/HeaderContent";
import TopicsContent from "~/components/topicSidebar/TopicsContent";
import NoteEditor from "~/components/noteEditor/NoteEditor";
import { NoteCard } from "~/components/noteCard/NoteCard";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [selectedTopic] = useStore((state) => [state.selectedTopic]);

  const { data: sessionData } = useSession();

  const { data: notes, refetch: refetchNotes } = api.note.getAll.useQuery(
    {
      topicId: selectedTopic?.id ?? "",
    },
    {
      enabled: sessionData?.user !== undefined,
    }
  );

  const createNote = api.note.create.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

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
        <AppShell
          styles={{
            main: {
              background:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          }}
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          navbar={
            <Navbar
              p="md"
              hiddenBreakpoint="sm"
              hidden={!opened}
              width={{ sm: 200, lg: 300 }}
            >
              <Text>Application navbar</Text>
              <TopicsContent />
            </Navbar>
          }
          footer={
            <Footer height={60} p="md">
              Application footer
            </Footer>
          }
          header={
            <Header height={{ base: 50, md: 70 }} p="md">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  justifyContent: "space-between",
                }}
              >
                <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                  />
                </MediaQuery>
                <HeaderContent />
              </div>
            </Header>
          }
        >
          <Text>Resize app to see responsive navbar in action</Text>
          <NoteEditor
            onSave={({ title, content }) => {
              void createNote.mutate({
                title,
                content,
                topicId: selectedTopic?.id ?? "",
              });
            }}
          />
        </AppShell>
      </main>
    </>
  );
};

export default Home;
