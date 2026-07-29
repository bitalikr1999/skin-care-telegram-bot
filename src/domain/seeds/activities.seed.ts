import { IActivity } from '../entities/activity/activity.types';

function activity(params: {
  key: string;
  label: string;
  category_key: string;
  category_label: string;
}): IActivity {
  return params;
}

export const ACTIVITY_SEEDS: IActivity[] = [
  activity({
    key: 'dairy',
    label: 'молочні продукти',
    category_key: 'food',
    category_label: 'Їжа',
  }),
  activity({
    key: 'cheese',
    label: 'сир',
    category_key: 'food',
    category_label: 'Їжа',
  }),
  activity({
    key: 'yogurt',
    label: 'йогурт',
    category_key: 'food',
    category_label: 'Їжа',
  }),
  activity({
    key: 'butter',
    label: 'вершкове масло',
    category_key: 'food',
    category_label: 'Їжа',
  }),
  activity({
    key: 'eggs',
    label: 'яйця',
    category_key: 'food',
    category_label: 'Їжа',
  }),
  activity({
    key: 'nuts',
    label: 'горіхи',
    category_key: 'food',
    category_label: 'Їжа',
  }),
  activity({
    key: 'seafood',
    label: 'морепродукти',
    category_key: 'food',
    category_label: 'Їжа',
  }),
  activity({
    key: 'honey',
    label: 'мед',
    category_key: 'food',
    category_label: 'Їжа',
  }),
  activity({
    key: 'soy',
    label: 'соя',
    category_key: 'food',
    category_label: 'Їжа',
  }),
  activity({
    key: 'red_meat',
    label: 'червоне мʼясо',
    category_key: 'food',
    category_label: 'Їжа',
  }),
  activity({
    key: 'gluten',
    label: 'глютен (хліб/випічка)',
    category_key: 'food',
    category_label: 'Їжа',
  }),
  activity({
    key: 'chocolate',
    label: 'шоколад',
    category_key: 'food',
    category_label: 'Їжа',
  }),
  activity({
    key: 'sugar',
    label: 'багато цукру',
    category_key: 'food',
    category_label: 'Їжа',
  }),
  activity({
    key: 'sweets',
    label: 'солодощі',
    category_key: 'food',
    category_label: 'Їжа',
  }),
  activity({
    key: 'fried',
    label: 'смажене',
    category_key: 'food',
    category_label: 'Їжа',
  }),
  activity({
    key: 'citrus',
    label: 'цитрусові',
    category_key: 'food',
    category_label: 'Їжа',
  }),
  activity({
    key: 'tomato',
    label: 'томати',
    category_key: 'food',
    category_label: 'Їжа',
  }),
  activity({
    key: 'strawberry',
    label: 'полуниця',
    category_key: 'food',
    category_label: 'Їжа',
  }),
  activity({
    key: 'spicy',
    label: 'гострі страви',
    category_key: 'food',
    category_label: 'Їжа',
  }),
  activity({
    key: 'beer',
    label: 'пиво',
    category_key: 'drinks',
    category_label: 'Напої',
  }),
  activity({
    key: 'wine',
    label: 'вино',
    category_key: 'drinks',
    category_label: 'Напої',
  }),
  activity({
    key: 'spirits',
    label: 'міцні напої',
    category_key: 'drinks',
    category_label: 'Напої',
  }),
  activity({
    key: 'coffee',
    label: 'кава',
    category_key: 'drinks',
    category_label: 'Напої',
  }),
  activity({
    key: 'tea',
    label: 'чай',
    category_key: 'drinks',
    category_label: 'Напої',
  }),
  activity({
    key: 'soda',
    label: 'газовані напої',
    category_key: 'drinks',
    category_label: 'Напої',
  }),
  activity({
    key: 'energy_drink',
    label: 'енергетики',
    category_key: 'drinks',
    category_label: 'Напої',
  }),
  activity({
    key: 'sea_swim',
    label: 'купання в морі',
    category_key: 'activity_environment',
    category_label: 'Активність та довкілля',
  }),
  activity({
    key: 'pool',
    label: 'басейн',
    category_key: 'activity_environment',
    category_label: 'Активність та довкілля',
  }),
  activity({
    key: 'sauna',
    label: 'сауна/лазня',
    category_key: 'activity_environment',
    category_label: 'Активність та довкілля',
  }),
  activity({
    key: 'sun',
    label: 'довге перебування на сонці',
    category_key: 'activity_environment',
    category_label: 'Активність та довкілля',
  }),
  activity({
    key: 'heat',
    label: 'спека/духота',
    category_key: 'activity_environment',
    category_label: 'Активність та довкілля',
  }),
  activity({
    key: 'sport',
    label: 'біг/спорт',
    category_key: 'activity_environment',
    category_label: 'Активність та довкілля',
  }),
  activity({
    key: 'stress',
    label: 'сильний стрес',
    category_key: 'activity_environment',
    category_label: 'Активність та довкілля',
  }),
  activity({
    key: 'poor_sleep',
    label: 'поганий сон',
    category_key: 'activity_environment',
    category_label: 'Активність та довкілля',
  }),
  activity({
    key: 'new_cosmetics',
    label: 'новий крем/косметика',
    category_key: 'household_care',
    category_label: 'Побут і догляд',
  }),
  activity({
    key: 'new_perfume',
    label: 'новий парфум',
    category_key: 'household_care',
    category_label: 'Побут і догляд',
  }),
  activity({
    key: 'new_detergent',
    label: 'новий пральний порошок',
    category_key: 'household_care',
    category_label: 'Побут і догляд',
  }),
  activity({
    key: 'synthetic_clothes',
    label: 'синтетичний одяг',
    category_key: 'household_care',
    category_label: 'Побут і догляд',
  }),
  activity({
    key: 'animal_contact',
    label: 'контакт з твариною',
    category_key: 'household_care',
    category_label: 'Побут і догляд',
  }),
  activity({
    key: 'chemical_cleaning',
    label: 'прибирання з хімією',
    category_key: 'household_care',
    category_label: 'Побут і догляд',
  }),
  activity({
    key: 'antihistamine',
    label: 'антигістамінне',
    category_key: 'meds_supplements',
    category_label: 'Ліки та добавки',
  }),
  activity({
    key: 'steroid_cream',
    label: 'кортикостероїдний крем',
    category_key: 'meds_supplements',
    category_label: 'Ліки та добавки',
  }),
  activity({
    key: 'new_meds',
    label: 'нові ліки',
    category_key: 'meds_supplements',
    category_label: 'Ліки та добавки',
  }),
  activity({
    key: 'vitamins',
    label: 'вітаміни/добавки',
    category_key: 'meds_supplements',
    category_label: 'Ліки та добавки',
  }),
];

export const ACTIVITY_KEYS: string[] = ACTIVITY_SEEDS.map(
  (item) => item.key,
);
