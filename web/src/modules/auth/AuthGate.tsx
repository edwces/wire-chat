import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useCurrentUser } from "../../stores/useCurrentUser";

interface AuthGateProps {
  children: ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  const router = useRouter();
  const status = useCurrentUser((state) => state.status);
  useEffect(() => {
    if (status === "loggedOut" || status === "idle")
      router.push("/account/login");
  });

  if (status === "loggedIn") return <>{children}</>;

  return <div>Loading</div>;
}
