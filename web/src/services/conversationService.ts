import { axios } from "../lib/axios";
import { Message } from "../types/interfaces";

export function getConversationMessages(id: number): Promise<Message[]> {
  return axios
    .get(`/conversation/${id}/messages`)
    .then((response) => response.data);
}
