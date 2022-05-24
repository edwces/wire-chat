import { axios } from "../lib/axios";
import { Conversation, Message } from "../types/interfaces";

export function getConversationMessages(id: number): Promise<Message[]> {
  return axios
    .get(`/conversation/${id}/messages`)
    .then((response) => response.data);
}

export function getConversationParticipants(id: number): Promise<User[]> {
  return axios
    .get(`/conversation/${id}/participants`)
    .then((response) => response.data);
}

export function createConversation(ids: number[]): Promise<Conversation> {
  return axios
    .post(`/conversation`, { participants: ids })
    .then((response) => response.data);
}
