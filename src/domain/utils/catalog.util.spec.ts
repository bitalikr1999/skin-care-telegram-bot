import { CatalogUtils } from './catalog.util';

describe('CatalogUtils', () => {
  describe('is_valid_activity_key', () => {
    it('should return true when key exists in seeds', () => {
      expect(
        CatalogUtils.is_valid_activity_key('honey'),
      ).toStrictEqual(true);
    });

    it('should return false when key is unknown', () => {
      expect(
        CatalogUtils.is_valid_activity_key('unknown'),
      ).toStrictEqual(false);
    });
  });

  describe('is_valid_symptom_key', () => {
    it('should return true when key exists in seeds', () => {
      expect(
        CatalogUtils.is_valid_symptom_key('itch'),
      ).toStrictEqual(true);
    });

    it('should return false when key is unknown', () => {
      expect(
        CatalogUtils.is_valid_symptom_key('unknown'),
      ).toStrictEqual(false);
    });
  });

  describe('toggle_item', () => {
    it('should add item when not selected', () => {
      expect(
        CatalogUtils.toggle_item({
          selected: ['a'],
          item_key: 'b',
        }),
      ).toStrictEqual(['a', 'b']);
    });

    it('should remove item when already selected', () => {
      expect(
        CatalogUtils.toggle_item({
          selected: ['a', 'b'],
          item_key: 'a',
        }),
      ).toStrictEqual(['b']);
    });
  });
});
