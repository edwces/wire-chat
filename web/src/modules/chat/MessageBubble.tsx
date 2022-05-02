import { Paper } from "@mantine/core";

interface MessageBubbleProps {
  content: string;
}

export function MessageBubble({ content }: MessageBubbleProps) {
  return (
    <Paper p={5} shadow="xs">
      {content}
    </Paper>
  );
}
