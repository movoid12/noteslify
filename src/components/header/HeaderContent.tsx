/* eslint-disable @typescript-eslint/unbound-method */
import { signIn, signOut, useSession } from "next-auth/react";

import {
  ActionIcon,
  Text,
  useMantineColorScheme,
  Avatar,
  Group,
  Button,
  Indicator,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import { useNetwork } from "@mantine/hooks";

export const HeaderContent = () => {
  const { data: sessionData } = useSession();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const networkStatus = useNetwork();
  const dark = colorScheme === "dark";


  return (
    <>
      <Group grow >
      <Text size={"sm"}>
        {sessionData?.user?.name ? ` user: ${sessionData.user.name}` : ""}
        {""}
      </Text>
        {sessionData?.user ? (
          <>
          <Indicator  color={networkStatus.online ? 'green' : 'red'}>
            <Avatar size={"sm"}
              src={sessionData?.user?.image ?? ""}
              alt={sessionData?.user?.name ?? ""}
            />
            </Indicator>
            <Button size="xs" variant="filled" color="red" onClick={() => void signOut()}>Sign out</Button>
          </>
        ) : (
          <Button variant="filled" color="green" onClick={() => void signIn()}>Sign in</Button>
        )}
      </Group>

      <ActionIcon
        variant="light"
        color={dark ? "yellow" : "blue"}
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
      >
        {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
      </ActionIcon>
    </>
  );
};
