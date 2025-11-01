'use client';

import {
  ActionIcon,
  Avatar,
  Button,
  Group,
  Indicator,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { useNetwork } from '@mantine/hooks';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import { useHelpers } from '~/hooks/use-helpers';
import { signIn, signOut } from '~/lib/clients';

export default function AppHeader() {
  // * color theme
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDarkScheme = colorScheme === 'dark';

  // * session data

  const { sessionData } = useHelpers();

  // * network status

  const networkStatus = useNetwork();

  return (
    <>
      <Group>
        <Text size="sm">
          {/* {sessionData?.user?.name ? ` User: ${sessionData.user.name}` : ""} */}
          {''}
        </Text>
        {sessionData?.user ? (
          <>
            <Indicator color={networkStatus.online ? 'green' : 'red'}>
              <Avatar
                size="sm"
                src={sessionData?.user?.image ?? ''}
                alt={sessionData?.user?.name ?? ''}
              />
            </Indicator>
            <Button
              size="xs"
              variant="filled"
              color="red"
              onClick={() => signOut()}
            >
              Sign out
            </Button>
          </>
        ) : (
          <Button
            variant="filled"
            color="green"
            onClick={() => signIn.social({ provider: 'google' })}
          >
            Sign in with Google
          </Button>
        )}
      </Group>

      <ActionIcon
        variant="light"
        color={isDarkScheme ? 'yellow' : 'blue'}
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
      >
        {isDarkScheme ? (
          <IconSun size="1.1rem" />
        ) : (
          <IconMoonStars size="1.1rem" />
        )}
      </ActionIcon>
    </>
  );
}
