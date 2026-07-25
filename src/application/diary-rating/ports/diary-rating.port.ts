import { RatingValue } from '@domain/consts/rating.const';

export interface IGetRatingParams {
  chat_id: number;
  date: string;
}

export interface IUpsertRatingParams {
  chat_id: number;
  date: string;
  rating: RatingValue;
}

export interface IDiaryRatingService {
  get(params: IGetRatingParams): Promise<RatingValue | null>;
  upsert(params: IUpsertRatingParams): Promise<void>;
}

export const DIARY_RATING_SERVICE = Symbol('DIARY_RATING_SERVICE');
