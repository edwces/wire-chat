import { Stack } from "@mantine/core";
import { Message } from "../../types/interfaces";
import { MessageBubble } from "./MessageBubble";

interface MessageListProps {
  data?: Message[];
}

export function MessageList({ data = [] }: MessageListProps) {
  return (
    <Stack spacing={5} sx={{ alignItems: "flex-start" }}>
      {data.map((message) => (
        <MessageBubble key={message.id} content={message.content} />
      ))}
    </Stack>
  );
}
