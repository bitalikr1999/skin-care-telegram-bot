import { IActivity } from '../entities/activity/activity.types';

export const ACTIVITY_SEEDS: IActivity[] = [
  {
    key: 'honey',
    label: 'мед',
    category_key: 'food',
    category_label: 'Їжа',
  },
  {
    key: 'dairy',
    label: 'молочні продукти',
    category_key: 'food',
    category_label: 'Їжа',
  },
  {
    key: 'gluten',
    label: 'глютен (хліб/випічка)',
    category_key: 'food',
    category_label: 'Їжа',
  },
  {
    key: 'citrus',
    label: 'цитрусові',
    category_key: 'food',
    category_label: 'Їжа',
  },
  {
    key: 'chocolate',
    label: 'шоколад',
    category_key: 'food',
    category_label: 'Їжа',
  },
  {
    key: 'nuts',
    label: 'горіхи',
    category_key: 'food',
    category_label: 'Їжа',
  },
  {
    key: 'eggs',
    label: 'яйця',
    category_key: 'food',
    category_label: 'Їжа',
  },
  {
    key: 'seafood',
    label: 'морепродукти',
    category_key: 'food',
    category_label: 'Їжа',
  },
  {
    key: 'spicy',
    label: 'гострі страви',
    category_key: 'food',
    category_label: 'Їжа',
  },
  {
    key: 'alcohol',
    label: 'алкоголь',
    category_key: 'food',
    category_label: 'Їжа',
  },
  {
    key: 'coffee',
    label: 'кава',
    category_key: 'food',
    category_label: 'Їжа',
  },
  {
    key: 'sea_swim',
    label: 'купання в морі',
    category_key: 'activity_environment',
    category_label: 'Активність та довкілля',
  },
  {
    key: 'pool',
    label: 'басейн',
    category_key: 'activity_environment',
    category_label: 'Активність та довкілля',
  },
  {
    key: 'sport',
    label: 'біг/спорт',
    category_key: 'activity_environment',
    category_label: 'Активність та довкілля',
  },
  {
    key: 'sauna',
    label: 'сауна/лазня',
    category_key: 'activity_environment',
    category_label: 'Активність та довкілля',
  },
  {
    key: 'sun',
    label: 'довге перебування на сонці',
    category_key: 'activity_environment',
    category_label: 'Активність та довкілля',
  },
  {
    key: 'stress',
    label: 'сильний стрес',
    category_key: 'activity_environment',
    category_label: 'Активність та довкілля',
  },
  {
    key: 'poor_sleep',
    label: 'поганий сон',
    category_key: 'activity_environment',
    category_label: 'Активність та довкілля',
  },
  {
    key: 'heat',
    label: 'спека/духота',
    category_key: 'activity_environment',
    category_label: 'Активність та довкілля',
  },
  {
    key: 'new_cosmetics',
    label: 'новий крем/косметика',
    category_key: 'household_care',
    category_label: 'Побут і догляд',
  },
  {
    key: 'new_detergent',
    label: 'новий пральний порошок',
    category_key: 'household_care',
    category_label: 'Побут і догляд',
  },
  {
    key: 'synthetic_clothes',
    label: 'синтетичний одяг',
    category_key: 'household_care',
    category_label: 'Побут і догляд',
  },
  {
    key: 'animal_contact',
    label: 'контакт з твариною',
    category_key: 'household_care',
    category_label: 'Побут і догляд',
  },
  {
    key: 'new_perfume',
    label: 'новий парфум',
    category_key: 'household_care',
    category_label: 'Побут і догляд',
  },
  {
    key: 'chemical_cleaning',
    label: 'прибирання з хімією',
    category_key: 'household_care',
    category_label: 'Побут і догляд',
  },
  {
    key: 'antihistamine',
    label: 'антигістамінне',
    category_key: 'meds_supplements',
    category_label: 'Ліки та добавки',
  },
  {
    key: 'steroid_cream',
    label: 'кортикостероїдний крем',
    category_key: 'meds_supplements',
    category_label: 'Ліки та добавки',
  },
  {
    key: 'vitamins',
    label: 'вітаміни/добавки',
    category_key: 'meds_supplements',
    category_label: 'Ліки та добавки',
  },
  {
    key: 'new_meds',
    label: 'нові ліки',
    category_key: 'meds_supplements',
    category_label: 'Ліки та добавки',
  },
];

export const ACTIVITY_KEYS: string[] = ACTIVITY_SEEDS.map(
  (item) => item.key,
);
