import ReactMarkdown from "react-markdown";

import { Box, Button, Collapse, Input, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export const NoteCard = ({
  note,
}: {
  note: { title: string; content: string };
}) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Box>
      <Collapse in={opened}>
        <ReactMarkdown>{note.content}</ReactMarkdown>
      </Collapse>
    </Box>
  );
};
