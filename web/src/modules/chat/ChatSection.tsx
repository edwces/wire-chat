import { Divider, Stack } from "@mantine/core";
import { useQuery } from "react-query";
import { getConversationMessages } from "../../services";
import { ChatHeader } from "./ChatHeader";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";

interface ChatSectionProps {
  id: number;
}

export function ChatSection({ id }: ChatSectionProps) {
  const { data } = useQuery(["conversation", "messages", id], () =>
    getConversationMessages(1)
  );

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
