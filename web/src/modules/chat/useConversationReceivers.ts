import { useQuery } from "react-query";
import { getConversationParticipants } from "../../services";
import { useAuthStatus } from "../../stores/useAuthStatus";

export function useConversationReceivers(id: number) {
  const userId = useAuthStatus((state) => state.id);
  return useQuery(
    ["conversation", "participants", id],
    () => getConversationParticipants(id),
    { select: (data) => data.find((participant) => participant.id !== userId) }
  );
}
