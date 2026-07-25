import { Rating } from '../entities/rating/rating.entity';
import { RatingValue } from '../consts/rating.const';

export interface IGetRatingByDateParams {
  chat_id: number;
  date: string;
}

export interface IUpsertRatingParams {
  chat_id: number;
  date: string;
  rating: RatingValue;
}

export interface IRatingsRepository {
  get_by_date(
    params: IGetRatingByDateParams,
  ): Promise<Rating | null>;
  upsert(params: IUpsertRatingParams): Promise<Rating>;
  list_all(chat_id: number): Promise<Rating[]>;
}
