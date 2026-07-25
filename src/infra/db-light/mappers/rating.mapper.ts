import { RatingMapper } from '@domain/entities/rating/rating.mapper';
import { Rating } from '@domain/entities/rating/rating.entity';
import { RatingUtils } from '@domain/utils/rating.util';
import { IDbRating } from '../interfaces';

export class DbRatingMapper {
  public static to_entity(row: IDbRating): Rating {
    if (!RatingUtils.is_valid(row.rating)) {
      throw new Error(`Invalid rating in db: ${row.rating}`);
    }

    return RatingMapper.to_entity({
      chat_id: row.chat_id,
      date: row.date,
      rating: row.rating,
    });
  }

  public static to_row(value: Rating): IDbRating {
    return RatingMapper.to_raw(value);
  }
}
