import { Rating } from './rating.entity';
import { IRating } from './rating.types';

export class RatingMapper {
  public static to_entity(data: IRating): Rating {
    return new Rating(data);
  }

  public static to_raw(value: Rating): IRating {
    return {
      chat_id: value.chat_id,
      date: value.date,
      rating: value.rating,
    };
  }
}
