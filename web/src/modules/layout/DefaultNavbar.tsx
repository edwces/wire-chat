import { Navbar } from "@mantine/core";
import { ConversationsList } from "../navigation";

export function DefaultNavbar() {
  return (
    <Navbar width={{ base: 300 }}>
      <ConversationsList />
    </Navbar>
  );
}
