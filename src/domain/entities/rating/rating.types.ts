import { RatingValue } from '../../consts/rating.const';

export interface IRating {
  chat_id: number;
  date: string;
  rating: RatingValue;
}
