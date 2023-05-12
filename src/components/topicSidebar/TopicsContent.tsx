/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Input, Stack, Text } from "@mantine/core";
import { useSession } from "next-auth/react";

import { useStore, Store } from "~/utils/store";
import { api } from "~/utils/api";

const TopicsContent: React.FC = () => {
  const { data: sessionData } = useSession();

  const [selectedTopic, setSelectedTopic] = useStore((state) => [
    state.selectedTopic,
    state.setSelectedTopic,
  ]);

  const { data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (topics) => {
        if (topics?.length) {
          setSelectedTopic(topics[0]);
        }
      },
    }
  );

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      refetchTopics();
    },
  });

  return (
    <Stack>
      <Input
        variant="filled"
        placeholder="Enter topic name"
        radius="xl"
        size="md"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            createTopic.mutate({ title: e.currentTarget.value });
            e.currentTarget.value = "";
          }
        }}
      />
      <Text>here is the topics</Text>
      {topics?.map((topic) => (
        <Box
          onClick={(evt) => {
            evt.preventDefault();
            setSelectedTopic(topic);
          }}
          key={topic.id}
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
            textAlign: "center",
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
            cursor: "pointer",

            "&:hover": {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[5]
                  : theme.colors.gray[1],
            },
          })}
        >
          <Text>{topic.title}</Text>
        </Box>
      ))}
    </Stack>
  );
};

export default TopicsContent;
