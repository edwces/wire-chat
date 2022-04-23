import { Navbar, Title } from "@mantine/core";
import { ConversationSearch, ConversationsList } from "../navigation";
import { UserProfile } from "../navigation/UserProfile";

export function DefaultNavbar() {
  return (
    <Navbar width={{ base: 300 }} p="md">
      <Navbar.Section>
        <Title mb={25}>Wire</Title>
      </Navbar.Section>
      <Navbar.Section grow>
        <ConversationSearch />
        <ConversationsList />
      </Navbar.Section>
      <Navbar.Section>
        <UserProfile />
      </Navbar.Section>
    </Navbar>
  );
}
