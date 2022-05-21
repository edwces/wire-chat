import { Stack } from "@mantine/core";
import { Conversation } from "../../types/interfaces";
import { ConversationButton } from "./ConversationButton";

interface ConversationsListProps {
  data?: Conversation[];
}

export function ConversationsList({ data = [] }: ConversationsListProps) {
  return (
    <Stack spacing={10} mt={20}>
      {data.map((conversation) => (
        <ConversationButton
          key={conversation.id}
          image={undefined}
          name={"Ben Terry"}
        />
      ))}
      <ConversationButton image={undefined} name={"Ben Terry"} isSelected />
      <ConversationButton image={undefined} name={"Ben Terry"} />
      <ConversationButton image={undefined} name={"Ben Terry"} />
      <ConversationButton image={undefined} name={"Ben Terry"} />
    </Stack>
  );
}
