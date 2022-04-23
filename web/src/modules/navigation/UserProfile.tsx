import { Avatar, Group, UnstyledButton, Text } from "@mantine/core";

export function UserProfile() {
  return (
    <UnstyledButton
      p="md"
      sx={(theme) => ({
        display: "block",
        width: "100%",
        "&:hover": { backgroundColor: theme.colors.gray[1] },
      })}
    >
      <Group spacing="md" sx={{}}>
        <Avatar />
        <Text>John Burguble</Text>
      </Group>
    </UnstyledButton>
  );
}
