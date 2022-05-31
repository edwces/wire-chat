import { NextPage } from "next";
import { useRouter } from "next/router";
import { AuthGate } from "../../../modules/auth";
import { ChatSection } from "../../../modules/chat";
import { AppLayout } from "../../../modules/layout";

const Chat: NextPage = () => {
  const router = useRouter();

  return (
    <AuthGate>
      <AppLayout>
        {router.isReady && (
          <ChatSection id={Number.parseInt(router.query.id as string)} />
        )}
      </AppLayout>
    </AuthGate>
  );
};

export default Chat;
