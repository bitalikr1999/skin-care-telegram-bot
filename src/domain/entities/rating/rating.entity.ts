import { RatingValue } from '../../consts/rating.const';

import { IRating } from './rating.types';

export class Rating {
  public readonly chat_id: number;
  public readonly date: string;
  public readonly rating: RatingValue;

  constructor(params: IRating) {
    this.chat_id = params.chat_id;
    this.date = params.date;
    this.rating = params.rating;
  }
}
