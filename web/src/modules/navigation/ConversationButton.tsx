import { Avatar, Group, Text, UnstyledButton } from "@mantine/core";
import { NextLink } from "@mantine/next";

interface ConversationButtonProps {
  name: string;
  image?: string | null;
  isSelected: boolean;
  id: string;
}

export function ConversationButton({
  name,
  image,
  id,
  isSelected,
}: ConversationButtonProps) {
  return (
    <UnstyledButton
      p="xs"
      component={NextLink}
      href={`/chat/${id}/${name}`}
      sx={(theme) => ({
        borderRadius: "10px",
        backgroundColor: isSelected ? theme.colors.blue[0] : "transparent",
        "&:hover": !isSelected && {
          backgroundColor: theme.colors.gray[1],
        },
      })}
    >
      <Group spacing="md">
        <Avatar size="lg" src={image} radius="xl" />
        <Text size="lg">{name}</Text>
      </Group>
    </UnstyledButton>
  );
}
