import { useQuery } from "react-query";
import { getUserConversations } from "../../services";
import { Conversation } from "../../types/interfaces";

export function useUserConversations(
  id: number,
  select?: (data: Conversation[]) => any
) {
  return useQuery(
    ["user", "conversations", id],
    () => getUserConversations(id!),
    { select }
  );
}
