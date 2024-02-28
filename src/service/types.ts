export interface DialogueI {
  user_utterance: string
  assistant_response: string
}

export interface ListI {
  name: string
  date: string
  history: DialogueI[]
}