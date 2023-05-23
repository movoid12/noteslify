import React, { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  MediaQuery,
  Burger,
  useMantineTheme,
  ScrollArea,
} from "@mantine/core";

import TopicsContent from "~/components/topicSidebar/TopicsContent";
import { HeaderContent } from "~/components/header/HeaderContent";

interface PageLayoutProps {
  children: React.ReactNode;
  withNavbar?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, withNavbar }) => {
  const theme = useMantineTheme();

  const [opened, setOpened] = useState(false);

  return (
    <>
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
            <div>
              {withNavbar && (
                <Navbar
                  p="md"
                  hiddenBreakpoint="sm"
                  hidden={!opened}
                  width={{ sm: 200, lg: 300 }}
                >
                  <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
                    <TopicsContent />
                  </Navbar.Section>
                </Navbar>
              )}
            </div>
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
          {children}
        </AppShell>
      </main>
    </>
  );
};
