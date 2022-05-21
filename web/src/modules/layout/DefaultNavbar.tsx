import { Navbar, Title } from "@mantine/core";
import { useQuery } from "react-query";
import { getUserConversations } from "../../services";
import { ConversationSearch, ConversationsList } from "../navigation";
import { UserProfileButton } from "../navigation/UserProfileButton";

export function DefaultNavbar() {
  const { data } = useQuery(["user", "conversations", 1], () =>
    getUserConversations(1)
  );

  return (
    <Navbar width={{ base: 300 }} p="md">
      <Navbar.Section>
        <Title mb={25}>Wire</Title>
      </Navbar.Section>
      <Navbar.Section grow>
        <ConversationSearch />
        <ConversationsList data={data} />
      </Navbar.Section>
      <Navbar.Section>
        <UserProfileButton />
      </Navbar.Section>
    </Navbar>
  );
}
