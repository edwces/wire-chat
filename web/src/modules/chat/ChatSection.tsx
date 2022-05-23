import { Divider, Stack } from "@mantine/core";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { getConversationMessages } from "../../services";
import { useConnection } from "../../stores/useConnection";
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
  const connection = useConnection((state) => state.connection);
  const idDeps = id.toString();

  useEffect(() => {
    connection?.send(JSON.stringify({ type: "JOIN_ROOM", data: { id } }));

    return () => {
      console.log("cleanup run");

      connection?.send(JSON.stringify({ type: "LEAVE_ROOM", data: { id } }));
    };
  }, [idDeps]);

  return (
    <section>
      <Stack sx={{ height: "95vh" }}>
        <ChatHeader />
        <Divider mb={10} />
        <MessageList data={data} />
        <Divider mt={10} />
        <MessageInput />
      </Stack>
    </section>
  );
}
