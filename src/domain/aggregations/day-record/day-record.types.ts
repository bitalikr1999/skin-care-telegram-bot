import { RatingValue } from '../../consts/rating.const';

export interface IDayRecord {
  chat_id: number;
  date: string;
  rating: RatingValue | null;
  activity_keys: string[];
  symptom_keys: string[];
}
