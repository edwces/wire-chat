import { Avatar, Group, Text } from "@mantine/core";

interface ChatHeaderProps {
  name: string;
  image?: string | null;
}

export function ChatHeader({ name, image }: ChatHeaderProps) {
  return (
    <header>
      <Group>
        <Avatar radius="xl" size="lg" src={image} />
        <Text size="lg" weight={400}>
          {name}
        </Text>
      </Group>
    </header>
  );
}
