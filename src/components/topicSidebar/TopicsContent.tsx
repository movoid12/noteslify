/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Divider, Input, Stack, Text } from "@mantine/core";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useTopicStore } from "~/utils/store";

const TopicsContent: React.FC = () => {
  const { data: sessionData } = useSession();

  const selectedTopic = useTopicStore((state) => state.selectedTopic);
  const setSelectedTopic = useTopicStore((state) => state.setSelectedTopic);

  console.log(selectedTopic?.title ?? "no topic selected");

  const { data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        setSelectedTopic(selectedTopic ?? data[0] ?? null);
      },
    }
  );

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      refetchTopics();
    },
  });
  // background color of Box Component changed when the topic is selected

  return (
    <Stack>
      <Text>To add new Topic:</Text>
      <Input
        variant="filled"
        disabled={sessionData?.user === undefined}
        placeholder={sessionData?.user === undefined ? "Sign in to add topic" : "Add a new topic"}
        radius="xl"
        size="md"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            createTopic.mutate({ title: e.currentTarget.value });
            e.currentTarget.value = "";
          }
        }}
      />
      <Divider />
      <Text>Select a Topic:</Text>
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
            "&:active": {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[4]
                  : theme.colors.gray[2],
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
