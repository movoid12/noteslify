/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  ActionIcon,
  Box,
  Button,
  Container,
  Divider,
  Group,
  Input,
  Modal,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

import { useTopicStore } from "~/utils/store";
import { useTopicLogic } from "~/helpers/useTopicLogic";
import { IconEdit, IconX } from "@tabler/icons-react";

const AppNavbar: React.FC = () => {
  const { createTopic, topics, deleteTopic, updateTopic, sessionData } = useTopicLogic();

  const selectedTopic = useTopicStore((state) => state.selectedTopic);

  const setSelectedTopic = useTopicStore((state) => state.setSelectedTopic);

  const [opened, { open, close }] = useDisclosure(false);

  const [newTopic, setNewTopic] = useState("");

  const [editMode, setEditMode] = useState(false);

  const [tempTopic, setTempTopic] = useState("");

  const [editingTopicId, setEditingTopicId] = useState("");

  const handleCreateTopic = () => {
    createTopic.mutate({ title: newTopic });
    setNewTopic("");
  };

  const handleDeleteTopic = (id: string) => {
    deleteTopic.mutate({ id });
  };

  const handleEditTopic = (id: string) => {
    setEditMode(true);

    const topic = topics?.find((topic) => topic.id === id);

    if (topic) {
      setTempTopic(topic.title);
    }
  };

  const handleUpdateItem = (id: string) => {
    updateTopic.mutate({ id, title: tempTopic });
    setTempTopic("");
    setEditMode(false);
  };

  const handleCloseEdit = () => {
    setEditMode(false);
    setTempTopic("");
  };

  const topicsCount = topics?.length;
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
            handleCreateTopic;
          }
        }}
      />
      <Button
        onClick={handleCreateTopic}
        disabled={sessionData?.user === undefined || newTopic === ""}
      >
        Add Topic
      </Button>
      <Button onClick={open} disabled={sessionData?.user === undefined}>
        Manage Topics
      </Button>
      <Divider />
      <Modal
        opened={opened}
        onClose={() => {
          setEditMode(false);
          close();
        }}
        title="Manage Topics"
      >
        <Container>
          {topics?.map((topic) => (
            <>
              <Group mb="sm" mt="sm" position="apart" key={topic.id}>
                {editMode && editingTopicId === topic.id ? (
                  <>
                    <Input
                      onChange={(e) => setTempTopic(e.currentTarget.value)}
                      value={tempTopic}
                      rightSection={
                        <IconX onClick={handleCloseEdit} style={{ cursor: "pointer" }} />
                      }
                    />
                    <Button onClick={() => handleUpdateItem(topic.id)}>Update</Button>
                  </>
                ) : (
                  <>
                    <ActionIcon
                      onClick={() => {
                        setEditMode(true);
                        setEditingTopicId(topic.id);
                        handleEditTopic(topic.id);
                      }}
                    >
                      <IconEdit />
                    </ActionIcon>
                    <Text size="sm">{topic.title}</Text>
                    <Button onClick={() => handleDeleteTopic(topic.id)} variant="outline">
                      Delete
                    </Button>
                  </>
                )}
              </Group>
              <Divider />
            </>
          ))}
        </Container>
      </Modal>
      <Group position="apart">
        <Text>Select a Topic:</Text>
        <Text fz={12}>{topicsCount} Topics</Text>
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
