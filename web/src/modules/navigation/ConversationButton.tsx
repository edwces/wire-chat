import { Avatar, Group, Text, UnstyledButton } from "@mantine/core";
import { NextLink } from "@mantine/next";

interface ConversationButtonProps {
  name: string;
  image: string;
  id: number;
}

export function ConversationButton({
  name,
  image,
  id,
}: ConversationButtonProps) {
  return (
    <UnstyledButton
      component={NextLink}
      href="/chat/1/bob-telly"
      sx={(theme) => ({
        "&:hover": {
          backgroundColor: theme.colors.gray[1],
        },
      })}
    >
      <Group spacing={5} p={5}>
        <Avatar size="lg" src={image} />
        <Text size="lg">{name}</Text>
      </Group>
    </UnstyledButton>
  );
}
