import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import type React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  confirmAction: () => void;
  cancelAction: () => void;
  message: string;
}

const ConfirmModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  confirmAction,
  cancelAction,
  message,
}) => {
  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={title}
      size="m"
      centered
      radius="md"
      padding="xl"
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
};

export default ConfirmModal;
