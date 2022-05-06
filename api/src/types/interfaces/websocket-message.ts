export type MessageType = "TEXT_MESSAGE";

export interface WebSocketMessage {
  type: MessageType;
  data: any;
}
