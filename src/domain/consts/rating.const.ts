export const RATING_MIN = 1;
export const RATING_MAX = 10;

export const RATING_VALUES = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
] as const;

export type RatingValue = (typeof RATING_VALUES)[number];
