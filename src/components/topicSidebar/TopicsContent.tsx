/* eslint-disable react-hooks/rules-of-hooks */
import { Input, Stack, Text } from "@mantine/core";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";

const TopicsContent: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
    }
  );
  const createTopic = api.topic.create.useMutation({});

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
      {JSON.stringify(topics)}
    </Stack>
  );
};

export default TopicsContent;
