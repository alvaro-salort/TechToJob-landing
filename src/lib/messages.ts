import esMessages from "@/messages/es.json";

export type Messages = typeof esMessages;

export function getMessages(): Messages {
  return esMessages;
}
