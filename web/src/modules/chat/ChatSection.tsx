import { Divider, ScrollArea, Stack } from "@mantine/core";
import { useEffect } from "react";
import { useQuery } from "react-query";
import {
  getConversationMessages,
  getConversationParticipants,
} from "../../services";
import { useConnection } from "../../stores/useConnection";
import { useCurrentUser } from "../../stores/useCurrentUser";
import { User } from "../../types/interfaces";
import { ChatHeader } from "./ChatHeader";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";

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
  const connection = useConnection((state) => state.connection);
  const userId = useCurrentUser((state) => state.id);
  const idDeps = id.toString();

  const getReceiver = (participants: User[]) => {
    return participants.find((participant) => participant.id !== userId);
  };

  useEffect(() => {
    connection?.send(JSON.stringify({ type: "JOIN_ROOM", data: { id } }));

    return () => {
      console.log("cleanup run");

      connection?.send(JSON.stringify({ type: "LEAVE_ROOM", data: { id } }));
    };
  }, [idDeps]);

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
