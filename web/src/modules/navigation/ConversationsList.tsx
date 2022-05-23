import { Stack } from "@mantine/core";
import { useRouter } from "next/router";
import { useCurrentUser } from "../../stores/useCurrentUser";
import { Conversation } from "../../types/interfaces";
import { ConversationButton } from "./ConversationButton";

interface ConversationsListProps {
  data?: Conversation[];
}

// TODO: Maybe remove id prop in Conversation Button and instead add href prop
// TODO: Or Wrap it inside NextLink
export function ConversationsList({ data = [] }: ConversationsListProps) {
  const router = useRouter();
  const userId = useCurrentUser((state) => state.id);
  console.log(userId);

  const getReceiver = (conversation: Conversation) => {
    return conversation.participants.find(
      (participant) => participant.id !== userId
    );
  };

  return (
    <Stack spacing={10}>
      {data.map((conversation) => {
        const receiver = getReceiver(conversation);
        return (
          <ConversationButton
            key={conversation.id}
            id={conversation.id}
            image={receiver!.avatar}
            name={receiver!.name}
            isSelected={router.query.id == conversation.id}
          />
        );
      })}
    </Stack>
  );
}
