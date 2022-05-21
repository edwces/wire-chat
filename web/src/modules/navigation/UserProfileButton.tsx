import { Avatar, Group, UnstyledButton, Text } from "@mantine/core";

interface UserProfileButtonProps {
  name: string;
  image: string | null;
}

export function UserProfileButton({ name, image }: UserProfileButtonProps) {
  return (
    <UnstyledButton
      p="sm"
      sx={(theme) => ({
        display: "block",
        width: "100%",
        borderRadius: "10px",
        "&:hover": { backgroundColor: theme.colors.gray[1] },
      })}
    >
      <Group spacing="md">
        <Avatar src={image} radius="xl" size="lg" />
        <Text>{name}</Text>
      </Group>
    </UnstyledButton>
  );
}
