import { ISymptom } from '../entities/symptom/symptom.types';

function symptom(params: {
  key: string;
  label: string;
  category_key: string;
  category_label: string;
}): ISymptom {
  return params;
}

export const SYMPTOM_SEEDS: ISymptom[] = [
  symptom({
    key: 'rash_hands',
    label: 'висип на руках',
    category_key: 'skin',
    category_label: 'Шкіра',
  }),
  symptom({
    key: 'rash_legs',
    label: 'висип на ногах',
    category_key: 'skin',
    category_label: 'Шкіра',
  }),
  symptom({
    key: 'rash_face',
    label: 'висип на обличчі',
    category_key: 'skin',
    category_label: 'Шкіра',
  }),
  symptom({
    key: 'rash_body',
    label: 'висип на тілі',
    category_key: 'skin',
    category_label: 'Шкіра',
  }),
  symptom({
    key: 'itch',
    label: 'свербіж',
    category_key: 'skin',
    category_label: 'Шкіра',
  }),
  symptom({
    key: 'redness',
    label: 'почервоніння',
    category_key: 'skin',
    category_label: 'Шкіра',
  }),
  symptom({
    key: 'dry_skin',
    label: 'сухість шкіри',
    category_key: 'skin',
    category_label: 'Шкіра',
  }),
  symptom({
    key: 'swelling',
    label: 'набряк',
    category_key: 'skin',
    category_label: 'Шкіра',
  }),
  symptom({
    key: 'stomach_pain',
    label: 'біль у животі',
    category_key: 'general',
    category_label: 'Загальне самопочуття',
  }),
  symptom({
    key: 'bloating',
    label: 'здуття',
    category_key: 'general',
    category_label: 'Загальне самопочуття',
  }),
  symptom({
    key: 'nausea',
    label: 'нудота',
    category_key: 'general',
    category_label: 'Загальне самопочуття',
  }),
  symptom({
    key: 'headache',
    label: 'головний біль',
    category_key: 'general',
    category_label: 'Загальне самопочуття',
  }),
  symptom({
    key: 'fatigue',
    label: 'втома',
    category_key: 'general',
    category_label: 'Загальне самопочуття',
  }),
  symptom({
    key: 'bad_mood',
    label: 'поганий настрій',
    category_key: 'general',
    category_label: 'Загальне самопочуття',
  }),
];

export const SYMPTOM_KEYS: string[] = SYMPTOM_SEEDS.map(
  (item) => item.key,
);
