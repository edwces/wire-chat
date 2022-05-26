import { Avatar, Group, UnstyledButton, Text, ActionIcon } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { DotsVertical } from "tabler-icons-react";

interface UserProfileButtonProps {
  name: string;
  image?: string | null;
  onClick?: () => void;
}

export function UserProfileButton({
  name,
  image,
  onClick,
}: UserProfileButtonProps) {
  const modal = useModals();

  const openUserSettingsModal = () => {
    modal.openContextModal("userSettingsModal", {
      title: "User settings",
      centered: true,
      innerProps: {},
    });
  };

  return (
    <UnstyledButton
      p="sm"
      sx={(theme) => ({
        display: "block",
        width: "100%",
        borderRadius: "10px",
      })}
      onClick={onClick}
    >
      <Group position="apart">
        <Group spacing="md">
          <Avatar src={image} radius="xl" size="lg" />
          <Text>{name}</Text>
        </Group>
        <ActionIcon onClick={openUserSettingsModal} size={28} radius="xl">
          <DotsVertical />
        </ActionIcon>
      </Group>
    </UnstyledButton>
  );
}
