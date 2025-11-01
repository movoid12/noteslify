import {
  AppShell,
  Burger,
  Footer,
  Header,
  MediaQuery,
  Navbar,
  ScrollArea,
  useMantineTheme,
} from '@mantine/core';
import type React from 'react';
import { useState } from 'react';

import AppHeader from '~/components/app-header';
import AppNavbar from '~/components/app-navbar';

export default function PageLayout({
  children,
  withNavbar,
}: {
  children: React.ReactNode;
  withNavbar?: boolean;
}) {
  const theme = useMantineTheme();

  const [opened, setOpened] = useState(false);

  return (
    <main>
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === 'dark'
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
                <Navbar.Section grow mx="-xs" px="xs">
                  <ScrollArea type="scroll">
                    <AppNavbar />
                  </ScrollArea>
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
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'space-between',
              }}
            >
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <AppHeader />
            </div>
          </Header>
        }
      >
        {children}
      </AppShell>
    </main>
  );
}
