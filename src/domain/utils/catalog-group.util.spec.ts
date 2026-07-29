import { CatalogGroupUtils } from './catalog-group.util';

describe('CatalogGroupUtils', () => {
  const items = [
    {
      key: 'honey',
      label: 'мед',
      category_key: 'food',
      category_label: 'Їжа',
    },
    {
      key: 'dairy',
      label: 'молочні',
      category_key: 'food',
      category_label: 'Їжа',
    },
    {
      key: 'stress',
      label: 'стрес',
      category_key: 'env',
      category_label: 'Довкілля',
    },
  ];

  describe('categories', () => {
    it('should return unique categories in order', () => {
      expect(CatalogGroupUtils.categories(items)).toStrictEqual([
        { key: 'food', label: 'Їжа' },
        { key: 'env', label: 'Довкілля' },
      ]);
    });
  });

  describe('filter_items', () => {
    it('should filter by category', () => {
      expect(
        CatalogGroupUtils.filter_items({
          items,
          category_key: 'food',
        }),
      ).toStrictEqual([items[0], items[1]]);
    });
  });
});
