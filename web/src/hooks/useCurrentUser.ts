import { useQuery } from "react-query";
import { getUser } from "../services";
import { useAuthStatus } from "../stores/useAuthStatus";

export function useCurrentUser() {
  const id = useAuthStatus((state) => state.id);
  return useQuery(["user", id], () => getUser(id!));
}
