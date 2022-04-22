import { Avatar, Group, Text } from "@mantine/core";

export function ChannelHeader() {
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
