import { Navbar, Title } from "@mantine/core";
import { useQuery } from "react-query";
import { axios } from "../../lib/axios";
import { ConversationSearch, ConversationsList } from "../navigation";
import { UserProfileButton } from "../navigation/UserProfileButton";

export function DefaultNavbar() {
  const { data } = useQuery(["user", 1, "conversations"], () =>
    axios.get("/user/1/conversations").then((response) => response.data)
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
