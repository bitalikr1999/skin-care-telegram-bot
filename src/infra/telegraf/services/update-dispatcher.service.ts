import { Inject, Injectable, Logger } from '@nestjs/common';
import { Input, Telegraf } from 'telegraf';

import { BOT_UPDATE_HANDLER } from '@domain/consts/bot-tokens.const';
import {
  IBotUpdateHandler,
  IBotView,
} from '@domain/interfaces/bot-ui.interface';

import { TELEGRAF_BOT } from '../consts';
import {
  TelegrafUpdateMapper,
  TelegrafViewMapper,
} from '../mappers/telegraf.mapper';

@Injectable()
export class UpdateDispatcherService {
  private readonly logger = new Logger(UpdateDispatcherService.name);

  constructor(
    @Inject(TELEGRAF_BOT)
    private readonly bot: Telegraf,
    @Inject(BOT_UPDATE_HANDLER)
    private readonly update_handler: IBotUpdateHandler,
  ) {}

  public register(): void {
    this.bot.on('text', async (ctx) => {
      const command = TelegrafUpdateMapper.to_command(ctx);
      if (!command) {
        return;
      }

      try {
        const view = await this.update_handler.handle_command(
          command,
        );
        await this._send_view(ctx.chat.id, view);
      } catch (error) {
        this.logger.error('Command handling failed', error as Error);
        await ctx.reply('Сталася помилка. Спробуй ще раз.');
      }
    });

    this.bot.on('callback_query', async (ctx) => {
      const callback = TelegrafUpdateMapper.to_callback(ctx);
      if (!callback) {
        return;
      }

      try {
        await ctx.answerCbQuery();
        if (callback.data.startsWith('noop:')) {
          return;
        }

        const view = await this.update_handler.handle_callback(
          callback,
        );
        await this._send_view(callback.chat_id, view);
      } catch (error) {
        this.logger.error(
          'Callback handling failed',
          error as Error,
        );
        await ctx.answerCbQuery('Помилка');
      }
    });
  }

  private async _send_view(
    chat_id: number,
    view: IBotView,
  ): Promise<void> {
    if (view.document) {
      await this.bot.telegram.sendDocument(
        chat_id,
        Input.fromBuffer(
          view.document.buffer,
          view.document.filename,
        ),
        {
          caption: view.text || undefined,
          ...TelegrafViewMapper.to_extra(view),
        },
      );
      return;
    }

    if (
      view.edit_message_id !== undefined &&
      view.edit_reply_markup_only &&
      view.buttons
    ) {
      await this.bot.telegram.editMessageReplyMarkup(
        chat_id,
        view.edit_message_id,
        undefined,
        TelegrafViewMapper.to_markup(view.buttons).reply_markup,
      );
      return;
    }

    if (view.edit_message_id !== undefined) {
      await this.bot.telegram.editMessageText(
        chat_id,
        view.edit_message_id,
        undefined,
        view.text,
        TelegrafViewMapper.to_extra(view),
      );
      return;
    }

    await this.bot.telegram.sendMessage(
      chat_id,
      view.text,
      TelegrafViewMapper.to_extra(view),
    );
  }
}
