import { Button, Group, Modal, Stack, Text } from '@mantine/core';

export default function ConfirmModal({
  isOpen,
  onClose,
  title,
  confirmAction,
  cancelAction,
  message,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  confirmAction: () => void;
  cancelAction: () => void;
  message: string;
}) {
  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={title}
      size="m"
      centered
      radius="md"
      padding="xl"
      zIndex={9999}
    >
      <Stack>
        <Group position="center">
          <Text>{message}</Text>
        </Group>
        <Group spacing="xl" grow>
          <Button onClick={confirmAction} color="red">
            Yes
          </Button>
          <Button onClick={cancelAction}>No</Button>
        </Group>
      </Stack>
    </Modal>
  );
}
