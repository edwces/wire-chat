import { Avatar, Group, Text, UnstyledButton } from "@mantine/core";

interface ConversationButtonProps {
  name: string;
  image: string;
}

export function ConversationButton({ name, image }: ConversationButtonProps) {
  return (
    <UnstyledButton
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
