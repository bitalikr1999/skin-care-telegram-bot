import { Inject, Injectable } from '@nestjs/common';

import { RatingValue } from '@domain/consts/rating.const';
import { RATINGS_REPOSITORY } from '@domain/consts/repository-tokens.const';
import { IRatingsRepository } from '@domain/repositories';

import {
  IDiaryRatingService,
  IGetRatingParams,
  IUpsertRatingParams,
} from '../../ports/diary-rating.port';

@Injectable()
export class DiaryRatingService implements IDiaryRatingService {
  constructor(
    @Inject(RATINGS_REPOSITORY)
    private readonly ratings_repository: IRatingsRepository,
  ) {}

  public async get(
    params: IGetRatingParams,
  ): Promise<RatingValue | null> {
    const rating = await this.ratings_repository.get_by_date({
      chat_id: params.chat_id,
      date: params.date,
    });

    return rating?.rating ?? null;
  }

  public async upsert(
    params: IUpsertRatingParams,
  ): Promise<void> {
    await this.ratings_repository.upsert({
      chat_id: params.chat_id,
      date: params.date,
      rating: params.rating,
    });
  }
}
