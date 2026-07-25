import { Context } from 'telegraf';

import {
  TelegrafUpdateMapper,
  TelegrafViewMapper,
} from './telegraf.mapper';

describe('TelegrafUpdateMapper', () => {
  describe('to_command', () => {
    it('should map slash command', () => {
      const ctx = {
        chat: { id: 42 },
        message: { text: '/start@bot' },
      } as Context;

      expect(TelegrafUpdateMapper.to_command(ctx)).toStrictEqual({
        chat_id: 42,
        command: 'start',
      });
    });

    it('should return null when text is not a command', () => {
      const ctx = {
        chat: { id: 42 },
        message: { text: 'hello' },
      } as Context;

      expect(TelegrafUpdateMapper.to_command(ctx)).toStrictEqual(
        null,
      );
    });
  });

  describe('to_callback', () => {
    it('should map callback query', () => {
      const ctx = {
        chat: { id: 42 },
        callbackQuery: {
          data: 'nav:menu',
          message: { message_id: 9 },
        },
      } as Context;

      expect(
        TelegrafUpdateMapper.to_callback(ctx),
      ).toStrictEqual({
        chat_id: 42,
        message_id: 9,
        data: 'nav:menu',
      });
    });

    it('should return null when callback is missing', () => {
      const ctx = { chat: { id: 42 } } as Context;

      expect(
        TelegrafUpdateMapper.to_callback(ctx),
      ).toStrictEqual(null);
    });
  });
});

describe('TelegrafViewMapper', () => {
  describe('to_extra', () => {
    it('should include parse_mode and reply markup', () => {
      const extra = TelegrafViewMapper.to_extra({
        text: 'hi',
        parse_mode: 'HTML',
        buttons: [[{ text: 'A', callback_data: 'a' }]],
      });

      expect(extra.parse_mode).toStrictEqual('HTML');
      expect(extra.reply_markup).toBeDefined();
    });
  });

  describe('to_markup', () => {
    it('should build inline keyboard markup', () => {
      const markup = TelegrafViewMapper.to_markup([
        [{ text: 'A', callback_data: 'a' }],
      ]);

      expect(markup.reply_markup).toBeDefined();
    });
  });
});
