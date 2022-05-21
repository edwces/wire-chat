import { axios } from "../lib/axios";
import { Conversation } from "../types/interfaces";

export function getUserConversations(id: number): Promise<Conversation[]> {
  return axios
    .get(`/user/${id}/conversations`)
    .then((response) => response.data);
}
