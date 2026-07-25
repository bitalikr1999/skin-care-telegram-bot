import { Context, Markup } from 'telegraf';

import {
  IBotButton,
  IBotIncomingCallback,
  IBotIncomingCommand,
  IBotView,
} from '@domain/interfaces/bot-ui.interface';

export class TelegrafUpdateMapper {
  public static to_command(
    ctx: Context,
  ): IBotIncomingCommand | null {
    const chat_id = ctx.chat?.id;
    const text =
      ctx.message && 'text' in ctx.message
        ? ctx.message.text
        : null;

    if (chat_id === undefined || !text || !text.startsWith('/')) {
      return null;
    }

    const command = text.slice(1).split(/[\s@]/)[0]?.toLowerCase();
    if (!command) {
      return null;
    }

    return { chat_id, command };
  }

  public static to_callback(
    ctx: Context,
  ): IBotIncomingCallback | null {
    const chat_id = ctx.chat?.id;
    const callback = ctx.callbackQuery;
    if (
      chat_id === undefined ||
      !callback ||
      !('data' in callback)
    ) {
      return null;
    }

    const message = callback.message;
    if (!message || !('message_id' in message)) {
      return null;
    }

    return {
      chat_id,
      message_id: message.message_id,
      data: callback.data,
    };
  }
}

export class TelegrafViewMapper {
  public static to_extra(view: IBotView) {
    const extra: {
      parse_mode?: 'HTML';
      reply_markup?: ReturnType<
        typeof Markup.inlineKeyboard
      >['reply_markup'];
    } = {};

    if (view.parse_mode) {
      extra.parse_mode = view.parse_mode;
    }

    if (view.buttons) {
      extra.reply_markup = Markup.inlineKeyboard(
        TelegrafViewMapper._to_markup_buttons(view.buttons),
      ).reply_markup;
    }

    return extra;
  }

  public static to_markup(
    buttons: IBotButton[][],
  ): ReturnType<typeof Markup.inlineKeyboard> {
    return Markup.inlineKeyboard(
      TelegrafViewMapper._to_markup_buttons(buttons),
    );
  }

  private static _to_markup_buttons(buttons: IBotButton[][]) {
    return buttons.map((row) =>
      row.map((button) =>
        Markup.button.callback(
          button.text,
          button.callback_data,
        ),
      ),
    );
  }
}
