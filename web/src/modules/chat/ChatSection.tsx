import { Divider, ScrollArea, Stack } from "@mantine/core";
import { useEffect } from "react";
import { useQuery } from "react-query";
import {
  getConversationMessages,
  getConversationParticipants,
} from "../../services";
import { useConnection } from "../../stores/useConnection";
import { useAuthStatus, useCurrentUser } from "../../stores/useAuthStatus";
import { User } from "../../types/interfaces";
import { ChatHeader } from "./ChatHeader";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";
import { useChatRoom } from "./useChatRoom";

interface ChatSectionProps {
  id: number;
}

export function ChatSection({ id }: ChatSectionProps) {
  const { data } = useQuery(["conversation", "messages", id], () =>
    getConversationMessages(id)
  );
  const participants = useQuery(["conversation", "participants", id], () =>
    getConversationParticipants(id)
  );
  const userId = useAuthStatus((state) => state.id);
  useChatRoom(id);
  const getReceiver = (participants: User[]) => {
    return participants.find((participant) => participant.id !== userId);
  };

  if (!data || !participants.data) return <div>Loading</div>;

  const receiver = getReceiver(participants.data);

  return (
    <section>
      <Stack sx={{ height: "95vh" }}>
        <ChatHeader name={receiver!.name} image={receiver?.avatar} />
        <Divider mb={10} />
        <ScrollArea type="scroll" sx={{ flexGrow: 1, paddingRight: 24 }}>
          <MessageList data={data} id={userId} />
        </ScrollArea>
        <Divider mt={10} />
        <MessageInput />
      </Stack>
    </section>
  );
}
