import { Divider, Stack } from "@mantine/core";
import { ChatHeader } from "./ChatHeader";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";

interface ChatProps {
  image: string;
  name: string;
}

export function Chat({ image, name }: ChatProps) {
  return (
    <section>
      <Stack sx={{ height: "95vh" }}>
        <ChatHeader />
        <Divider mb={10} />
        <MessageList />
        <Divider mt={10} />
        <MessageInput />
      </Stack>
    </section>
  );
}
