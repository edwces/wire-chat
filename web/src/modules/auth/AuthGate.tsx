import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useAuthStatus } from "../../stores/useAuthStatus";

interface AuthGateProps {
  children: ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  const router = useRouter();
  const status = useAuthStatus((state) => state.status);
  useEffect(() => {
    if (status === "loggedOut" || status === "idle")
      router.push("/account/login");
  });

  if (status === "loggedIn") return <>{children}</>;

  return <div>Loading</div>;
}
