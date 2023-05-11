/* eslint-disable @typescript-eslint/unbound-method */
import { signIn, signOut, useSession } from "next-auth/react";

import {
  ActionIcon,
  Text,
  useMantineColorScheme,
  Avatar,
  Group,
  Button,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

export const HeaderContent = () => {
  const { data: sessionData } = useSession();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return (
    <>
      <Text>
        Noteslify App
        {sessionData?.user?.name ? `Notes for ${sessionData.user.name}` : ""}
        {""}
      </Text>
      <Group>
        {sessionData?.user ? (
          <>
            <Button variant="outline" color="orange" onClick={() => void signOut()}>Sign out</Button>
            <Avatar
              src={sessionData?.user?.image ?? ""}
              alt={sessionData?.user?.name ?? ""}
            />
          </>
        ) : (
          <Button variant="outline" color="orange" onClick={() => void signIn()}>Sign in</Button>
        )}
      </Group>

      <ActionIcon
        variant="outline"
        color={dark ? "yellow" : "blue"}
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
      >
        {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
      </ActionIcon>
    </>
  );
};
