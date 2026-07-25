import { ISymptom } from '../entities/symptom/symptom.types';

export const SYMPTOM_SEEDS: ISymptom[] = [
  {
    key: 'rash_hands',
    label: 'висип на руках',
    category_key: 'skin',
    category_label: 'Шкіра',
  },
  {
    key: 'rash_legs',
    label: 'висип на ногах',
    category_key: 'skin',
    category_label: 'Шкіра',
  },
  {
    key: 'rash_face',
    label: 'висип на обличчі',
    category_key: 'skin',
    category_label: 'Шкіра',
  },
  {
    key: 'rash_body',
    label: 'висип на тілі',
    category_key: 'skin',
    category_label: 'Шкіра',
  },
  {
    key: 'itch',
    label: 'свербіж',
    category_key: 'skin',
    category_label: 'Шкіра',
  },
  {
    key: 'redness',
    label: 'почервоніння',
    category_key: 'skin',
    category_label: 'Шкіра',
  },
  {
    key: 'dry_skin',
    label: 'сухість шкіри',
    category_key: 'skin',
    category_label: 'Шкіра',
  },
  {
    key: 'swelling',
    label: 'набряк',
    category_key: 'skin',
    category_label: 'Шкіра',
  },
  {
    key: 'stomach_pain',
    label: 'біль у животі',
    category_key: 'general',
    category_label: 'Загальне самопочуття',
  },
  {
    key: 'bloating',
    label: 'здуття',
    category_key: 'general',
    category_label: 'Загальне самопочуття',
  },
  {
    key: 'nausea',
    label: 'нудота',
    category_key: 'general',
    category_label: 'Загальне самопочуття',
  },
  {
    key: 'headache',
    label: 'головний біль',
    category_key: 'general',
    category_label: 'Загальне самопочуття',
  },
  {
    key: 'fatigue',
    label: 'втома',
    category_key: 'general',
    category_label: 'Загальне самопочуття',
  },
  {
    key: 'bad_mood',
    label: 'поганий настрій',
    category_key: 'general',
    category_label: 'Загальне самопочуття',
  },
];

export const SYMPTOM_KEYS: string[] = SYMPTOM_SEEDS.map(
  (item) => item.key,
);
