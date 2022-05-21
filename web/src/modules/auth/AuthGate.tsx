import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useCurrentUser } from "../../stores/useCurrentUser";

interface AuthGateProps {
  children: ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  const router = useRouter();
  const status = useCurrentUser((state) => state.status);

  if (status === "loggedIn") return <>{children}</>;

  if (status === "loggedOut" || status === "idle")
    router.push("/account/login");

  return <div>Loading</div>;
}
