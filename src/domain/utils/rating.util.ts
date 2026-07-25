import {
  RATING_MAX,
  RATING_MIN,
  RatingValue,
} from '../consts/rating.const';

export function is_valid_rating(value: number): value is RatingValue {
  return (
    Number.isInteger(value) &&
    value >= RATING_MIN &&
    value <= RATING_MAX
  );
}
