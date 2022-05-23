import {
  ActionIcon,
  Group,
  Navbar,
  ScrollArea,
  Stack,
  Title,
} from "@mantine/core";
import { useQuery } from "react-query";
import { getUserConversations } from "../../services";
import { ConversationSearch, ConversationsList } from "../navigation";
import { UserProfileButton } from "../navigation/UserProfileButton";
import { UserPlus } from "tabler-icons-react";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useAuthStatus } from "../../stores/useAuthStatus";

export function DefaultNavbar() {
  const id = useAuthStatus((state) => state.id);
  const user = useCurrentUser();
  const { data } = useQuery(["user", "conversations", id], () =>
    getUserConversations(id!)
  );

  if (!user.data) return <div>Loading</div>;

  return (
    <Navbar width={{ base: 300 }} p="md">
      <Navbar.Section
        sx={(theme) => ({
          borderBottom: `1px solid ${theme.colors.gray[3]}`,
          paddingBottom: theme.spacing.md,
        })}
      >
        <Group position="apart">
          <Title>Wire</Title>
          <ActionIcon radius="xl" variant="default" size={45}>
            <UserPlus size={28} />
          </ActionIcon>
        </Group>
      </Navbar.Section>
      <Navbar.Section
        grow
        sx={(theme) => ({
          marginTop: theme.spacing.lg,
          marginBottom: theme.spacing.md,
        })}
      >
        <Stack spacing="xl">
          <ConversationSearch />
          <ScrollArea>
            <ConversationsList data={data} />
          </ScrollArea>
        </Stack>
      </Navbar.Section>
      <Navbar.Section
        sx={(theme) => ({
          borderTop: `1px solid ${theme.colors.gray[3]}`,
          paddingTop: theme.spacing.sm,
        })}
      >
        <UserProfileButton name={user.data?.name} image={user.data?.avatar} />
      </Navbar.Section>
    </Navbar>
  );
}
