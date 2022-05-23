import { Box, Stack } from "@mantine/core";
import { Message } from "../../types/interfaces";
import { MessageBubble } from "./MessageBubble";

interface MessageListProps {
  data?: Message[];
  id?: number;
}

export function MessageList({ data = [], id }: MessageListProps) {
  return (
    <Stack spacing={5} sx={{ alignItems: "flex-start" }}>
      {data.map((message) => (
        <Box
          key={message.id}
          sx={{ marginLeft: message.participant.id === id ? "auto" : 0 }}
        >
          <MessageBubble content={message.content} />
        </Box>
      ))}
    </Stack>
  );
}
