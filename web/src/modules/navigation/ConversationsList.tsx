import { Stack } from "@mantine/core";
import { Conversation } from "./Conversation";

export function ConversationsList() {
  return (
    <Stack spacing={10} mt={20}>
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
    </Stack>
  );
}
