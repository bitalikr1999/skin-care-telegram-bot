import { CallbackData } from './callback.const';

describe('CallbackData', () => {
  describe('act_toggle', () => {
    it('should build callback data', () => {
      expect(CallbackData.act_toggle('honey')).toStrictEqual(
        'act:toggle:honey',
      );
    });
  });

  describe('sym_toggle', () => {
    it('should build callback data', () => {
      expect(CallbackData.sym_toggle('itch')).toStrictEqual(
        'sym:toggle:itch',
      );
    });
  });

  describe('rat_set', () => {
    it('should build callback data', () => {
      expect(CallbackData.rat_set(7)).toStrictEqual('rat:set:7');
    });
  });

  describe('stats_period', () => {
    it('should build callback data', () => {
      expect(CallbackData.stats_period('week')).toStrictEqual(
        'stats:period:week',
      );
    });
  });

  describe('act_category', () => {
    it('should build category callback', () => {
      expect(CallbackData.act_category('food')).toStrictEqual(
        'nav:act:cat:food',
      );
    });
  });
});
