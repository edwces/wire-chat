import { axios } from "../lib/axios";
import { Conversation, User } from "../types/interfaces";

export function getUserConversations(id: number): Promise<Conversation[]> {
  return axios
    .get(`/user/${id}/conversations`)
    .then((response) => response.data);
}

export function getUser(id: number): Promise<User> {
  return axios.get(`/user/${id}`).then((response) => response.data);
}
