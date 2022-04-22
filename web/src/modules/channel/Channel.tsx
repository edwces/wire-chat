import { Divider, Stack } from "@mantine/core";
import { ChannelHeader } from "./ChannelHeader";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";

interface ChannelProps {
  image: string;
  name: string;
}

export function Channel({ image, name }: ChannelProps) {
  return (
    <section>
      <Stack sx={{ height: "95vh" }}>
        <ChannelHeader />
        <Divider mb={10} />
        <MessageList />
        <Divider mt={10} />
        <MessageInput />
      </Stack>
    </section>
  );
}
