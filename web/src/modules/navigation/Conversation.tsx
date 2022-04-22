import { Avatar, Group, Text, UnstyledButton } from "@mantine/core";

export function Conversation() {
  return (
    <UnstyledButton
      sx={(theme) => ({
        "&:hover": {
          backgroundColor: theme.colors.gray[1],
        },
      })}
    >
      <Group spacing={5} p={5}>
        <Avatar size="lg" />
        <Text size="lg">Berry Terry</Text>
      </Group>
    </UnstyledButton>
  );
}
