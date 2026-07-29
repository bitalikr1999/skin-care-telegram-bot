export interface ICatalogGroupItem {
  key: string;
  label: string;
  category_key: string;
  category_label: string;
}

export interface ICatalogGroup {
  key: string;
  label: string;
}

export class CatalogGroupUtils {
  public static categories(
    items: ICatalogGroupItem[],
  ): ICatalogGroup[] {
    const result: ICatalogGroup[] = [];
    const seen = new Set<string>();

    for (const item of items) {
      if (seen.has(item.category_key)) {
        continue;
      }
      seen.add(item.category_key);
      result.push({
        key: item.category_key,
        label: item.category_label,
      });
    }

    return result;
  }

  public static filter_items(params: {
    items: ICatalogGroupItem[];
    category_key: string;
  }): ICatalogGroupItem[] {
    return params.items.filter(
      (item) => item.category_key === params.category_key,
    );
  }

  public static find_category_label(params: {
    items: ICatalogGroupItem[];
    category_key: string;
  }): string | null {
    const item = params.items.find(
      (entry) => entry.category_key === params.category_key,
    );
    return item?.category_label ?? null;
  }
}
