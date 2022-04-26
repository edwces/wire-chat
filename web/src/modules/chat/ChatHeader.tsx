import { Avatar, Group, Text } from "@mantine/core";

export function ChatHeader() {
  return (
    <header>
      <Group>
        <Avatar radius="xl" size="lg" />
        <Text size="lg" weight={400}>
          Bob Bobby
        </Text>
      </Group>
    </header>
  );
}
