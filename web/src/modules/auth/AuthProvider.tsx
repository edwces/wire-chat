import { ReactNode, useEffect } from "react";
import { getAccessToken, setAccessToken } from "../../services";
import { refresh } from "../../services/authService";
import { useAuthStatus } from "../../stores/useAuthStatus";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { setLoggedIn, setLoggedOut } = useAuthStatus();

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return setLoggedOut();

    refresh(token)
      .then((data) => {
        console.log(data);

        setLoggedIn(Number.parseInt(data.id));
        setAccessToken(data.accessToken);
      })
      .catch(() => {
        setLoggedOut();
        setAccessToken("");
      });
  }, []);

  return <>{children}</>;
}
