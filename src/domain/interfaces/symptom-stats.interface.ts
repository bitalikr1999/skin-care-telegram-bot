export interface ICooccurrenceItem {
  key: string;
  days: number;
  percent: number;
}

export interface ISymptomCooccurrence {
  symptom_key: string;
  days: number;
  activities: ICooccurrenceItem[];
  symptoms: ICooccurrenceItem[];
}

export interface IDiaryDaySnapshot {
  date: string;
  activity_keys: string[];
  symptom_keys: string[];
}
