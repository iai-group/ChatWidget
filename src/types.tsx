export type ChatMessageButton = {
  title: string;
  payload: string;
  button_type: string;
};

export type ChatMessageAttachment = {
  type: string;
  payload: {
    images?: string[];
    buttons?: ChatMessageButton[];
  };
};

export type ChatMessage = {
  attachments?: ChatMessageAttachment[];
  text?: string;
  intent?: string;
};

export type AgentMessage = {
  recipient: string;
  message: ChatMessage;
  info?: string;
};

export type UserMessage = {
  message: string;
  metadata?: { [key: string]: any };
};

export type Article = {
  item_id: string;
  title: string;
  abstract: string;
  authors: string[];
  score: number;
};

export type Settings = {
  style?: ChatMessageStyle;
};

export type ChatMessageStyle = {
  name?: string;
  showStyleSwitch?: boolean;
};

export type Query = {
  mode?: string;
  token?: string;
};

export type EventHandler = (event?: any) => void;
