import { signIn, signOut } from 'next-auth/react';

import {
  ActionIcon,
  Text,
  useMantineColorScheme,
  Avatar,
  Group,
  Button,
  Indicator,
} from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { useNetwork } from '@mantine/hooks';
import { useHelpers } from '~/hooks/useHelpers';

const AppHeader = () => {
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
              onClick={() => void signOut()}
            >
              Sign out
            </Button>
          </>
        ) : (
          <Button variant="filled" color="green" onClick={() => void signIn()}>
            Sign in
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
};

export default AppHeader;
