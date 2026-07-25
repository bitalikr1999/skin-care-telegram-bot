import { CallbackRouter } from './callback.router';

describe('CallbackRouter', () => {
  describe('parse', () => {
    it('should parse navigation callbacks', () => {
      expect(CallbackRouter.parse('nav:menu')).toStrictEqual({
        kind: 'nav_menu',
      });
      expect(
        CallbackRouter.parse('nav:stats:rating'),
      ).toStrictEqual({ kind: 'nav_stats_rating' });
      expect(
        CallbackRouter.parse('nav:stats:symptoms'),
      ).toStrictEqual({ kind: 'nav_stats_symptoms' });
    });

    it('should parse legacy nav:stats as rating stats', () => {
      expect(CallbackRouter.parse('nav:stats')).toStrictEqual({
        kind: 'nav_stats_rating',
      });
    });

    it('should parse toggle and rating callbacks', () => {
      expect(
        CallbackRouter.parse('act:toggle:honey'),
      ).toStrictEqual({
        kind: 'act_toggle',
        activity_key: 'honey',
      });
      expect(
        CallbackRouter.parse('sym:toggle:itch'),
      ).toStrictEqual({
        kind: 'sym_toggle',
        symptom_key: 'itch',
      });
      expect(CallbackRouter.parse('rat:set:8')).toStrictEqual({
        kind: 'rat_set',
        rating: 8,
      });
    });

    it('should parse stats period', () => {
      expect(
        CallbackRouter.parse('stats:period:month'),
      ).toStrictEqual({
        kind: 'stats_period',
        period: 'month',
      });
    });

    it('should return unknown when data is invalid', () => {
      expect(CallbackRouter.parse('foo')).toStrictEqual({
        kind: 'unknown',
      });
      expect(
        CallbackRouter.parse('stats:period:year'),
      ).toStrictEqual({ kind: 'unknown' });
      expect(CallbackRouter.parse('rat:set:x')).toStrictEqual({
        kind: 'unknown',
      });
    });

    it('should parse done callbacks as done_menu', () => {
      expect(
        CallbackRouter.parse('done:activities'),
      ).toStrictEqual({ kind: 'done_menu' });
    });
  });
});
