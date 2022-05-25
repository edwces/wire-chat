import { Divider, ScrollArea, Stack } from "@mantine/core";
import { useAuthStatus } from "../../stores/useAuthStatus";
import { ChatHeader } from "./ChatHeader";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";
import { useChatRoom } from "./useChatRoom";
import { useConversationReceivers } from "./useConversationReceivers";
import { useConversationMessages } from "./useConversationMessages";

interface ChatSectionProps {
  id: number;
}

export function ChatSection({ id }: ChatSectionProps) {
  useChatRoom(id);
  const userId = useAuthStatus((state) => state.id);
  const messages = useConversationMessages(id);
  const receiver = useConversationReceivers(id);

  if (!messages.data || !receiver.data) return <div>Loading</div>;

  return (
    <section>
      <Stack sx={{ height: "95vh" }}>
        <ChatHeader name={receiver.data.name} image={receiver.data.avatar} />
        <Divider mb={10} />
        <ScrollArea type="scroll" sx={{ flexGrow: 1, paddingRight: 24 }}>
          <MessageList data={messages.data} id={userId!} />
        </ScrollArea>
        <Divider mt={10} />
        <MessageInput />
      </Stack>
    </section>
  );
}
