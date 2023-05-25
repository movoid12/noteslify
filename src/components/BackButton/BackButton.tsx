// implement a back button that will take the user back to the previous page using nextjs router or navigate

import { ActionIcon } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons-react";
import { useRouter } from "next/router";

const BackButton = () => {
  const router = useRouter();
  const handleBack = () => {
    void router.back();
  };

  return (
    <>
      <ActionIcon variant="outline" color="red" onClick={handleBack}>
        <IconArrowBack />
      </ActionIcon>
    </>
  );
};

export default BackButton;
