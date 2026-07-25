import {
  RATING_MAX,
  RATING_MIN,
  RatingValue,
} from '../consts/rating.const';

export class RatingUtils {
  public static is_valid(
    value: number,
  ): value is RatingValue {
    return (
      Number.isInteger(value) &&
      value >= RATING_MIN &&
      value <= RATING_MAX
    );
  }
}
