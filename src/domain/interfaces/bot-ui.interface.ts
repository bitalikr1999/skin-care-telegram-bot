export interface IBotIncomingCommand {
  chat_id: number;
  command: string;
}

export interface IBotIncomingCallback {
  chat_id: number;
  message_id: number;
  data: string;
}

export interface IBotButton {
  text: string;
  callback_data: string;
}

export interface IBotDocument {
  filename: string;
  buffer: Buffer;
}

export interface IBotView {
  text: string;
  buttons?: IBotButton[][];
  parse_mode?: 'HTML';
  edit_message_id?: number;
  edit_reply_markup_only?: boolean;
  document?: IBotDocument;
}

export interface IBotUpdateHandler {
  handle_command(
    params: IBotIncomingCommand,
  ): Promise<IBotView>;
  handle_callback(
    params: IBotIncomingCallback,
  ): Promise<IBotView>;
}
