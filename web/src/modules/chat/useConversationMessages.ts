import { useQuery } from "react-query";
import { getConversationMessages } from "../../services";

export function useConversationMessages(id: number) {
  return useQuery(["conversation", "messages", id], () =>
    getConversationMessages(id)
  );
}
