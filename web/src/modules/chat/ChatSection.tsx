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
  const userId = useAuthStatus((state) => state.id);
  const { data } = useQuery(["conversation", "messages", id], () =>
    getConversationMessages(id)
  );
  const receiver = useQuery(
    ["conversation", "participants", id],
    () => getConversationParticipants(id),
    { select: (data) => data.find((participant) => participant.id !== userId) }
  );
  useChatRoom(id);

  if (!data || !receiver.data) return <div>Loading</div>;

  return (
    <section>
      <Stack sx={{ height: "95vh" }}>
        <ChatHeader name={receiver.data.name} image={receiver.data.avatar} />
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
