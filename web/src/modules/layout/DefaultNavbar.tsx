import { Navbar, Title } from "@mantine/core";
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
      <Navbar.Section>
        <Title mb={25}>Wire</Title>
      </Navbar.Section>
      <Navbar.Section grow>
        <ConversationSearch />
        <ConversationsList data={data} />
      </Navbar.Section>
      <Navbar.Section>
        <UserProfileButton name={user.data?.name} image={user.data?.avatar} />
      </Navbar.Section>
    </Navbar>
  );
}
