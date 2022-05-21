import { Navbar, Stack, Title } from "@mantine/core";
import { useQuery } from "react-query";
import { getUser, getUserConversations } from "../../services";
import { ConversationSearch, ConversationsList } from "../navigation";
import { UserProfileButton } from "../navigation/UserProfileButton";

export function DefaultNavbar() {
  const { data } = useQuery(["user", "conversations", 1], () =>
    getUserConversations(1)
  );
  const user = useQuery(["user", 1], () => getUser(1));

  if (!user.data) return <div>Loading</div>;

  return (
    <Navbar width={{ base: 300 }} p="md">
      <Navbar.Section
        sx={(theme) => ({
          borderBottom: `1px solid ${theme.colors.gray[3]}`,
          paddingBottom: theme.spacing.md,
        })}
      >
        <Title>Wire</Title>
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
          <ConversationsList data={data} />
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
