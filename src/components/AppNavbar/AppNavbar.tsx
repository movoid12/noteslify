/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Button,
  Container,
  Divider,
  Group,
  Input,
  Mark,
  Modal,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

import { useTopicStore } from "~/utils/store";
import { useTopicLogic } from "~/helpers/helpers";

const AppNavbar: React.FC = () => {
  const selectedTopic = useTopicStore((state) => state.selectedTopic);
  const setSelectedTopic = useTopicStore((state) => state.setSelectedTopic);

  const { createTopic, topics, deleteTopic, updateTopic, sessionData } = useTopicLogic();

  const [newTopic, setNewTopic] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  // background color of Box Component changed when the topic is selected

  return (
    <Stack>
      <Text>To add new Topic:</Text>
      <Input
        variant="filled"
        disabled={sessionData?.user === undefined}
        placeholder={
          sessionData?.user === undefined ? "Sign in to add topic" : "Add a new topic"
        }
        radius="xl"
        size="md"
        value={newTopic}
        onChange={(e) => {
          setNewTopic(e.currentTarget.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            createTopic.mutate({ title: e.currentTarget.value });
            e.currentTarget.value = "";
            setNewTopic("");
          }
        }}
      />
      <Button
        onClick={() => {
          createTopic.mutate({ title: newTopic });
          setNewTopic("");
        }}
        disabled={sessionData?.user === undefined || newTopic === ""}
      >
        Add Topic
      </Button>
      <Button onClick={open} disabled={sessionData?.user === undefined}>
        Manage Topics
      </Button>
      <Divider />
      <Modal opened={opened} onClose={close} title="Manage Topics">
        <Container>
          {topics?.map((topic) => (
            <Box key={topic.id}>
              <Text size="sm">{topic.title}</Text>

              <Button
                onClick={() => {
                  deleteTopic.mutate({ id: topic.id });
                }}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Container>
      </Modal>
      <Group position="apart">
        <Text>Select a Topic:</Text>
        {/* <Mark fz={12}>{topicsCount} Topics</Mark> */}
      </Group>
      {topics?.map((topic) => (
        <Box
          bg={selectedTopic?.id === topic.id ? "#d2c293a3" : ""}
          onClick={(evt) => {
            evt.preventDefault();
            setSelectedTopic(topic);
          }}
          key={topic.id}
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
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

export default AppNavbar;
