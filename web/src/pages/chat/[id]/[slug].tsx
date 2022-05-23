import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChatSection } from "../../../modules/chat";
import { AppLayout } from "../../../modules/layout";

const Chat: NextPage = () => {
  const router = useRouter();

  return (
    <AppLayout>
      {router.isReady && (
        <ChatSection id={Number.parseInt(router.query.id as string)} />
      )}
    </AppLayout>
  );
};

export default Chat;
