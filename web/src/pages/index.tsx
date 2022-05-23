import type { NextPage } from "next";
import { AuthGate } from "../modules/auth";
import { AppLayout } from "../modules/layout";

const Home: NextPage = () => {
  return (
    <AuthGate>
      <AppLayout>hello</AppLayout>
    </AuthGate>
  );
};

export default Home;
