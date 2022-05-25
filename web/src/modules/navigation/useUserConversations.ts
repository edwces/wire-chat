import { useQuery } from "react-query";
import { getUserConversations } from "../../services";

export function useUserConversations(id: number) {
  return useQuery(["user", "conversations", id], () =>
    getUserConversations(id!)
  );
}
