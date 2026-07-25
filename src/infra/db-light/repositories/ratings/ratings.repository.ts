import { Injectable } from '@nestjs/common';

import { Rating } from '@domain/entities/rating/rating.entity';
import {
  IGetRatingByDateParams,
  IRatingsRepository,
  IUpsertRatingParams,
} from '@domain/repositories';
import { Repository } from '../../abstracts';
import { DbTable } from '../../enums/table.enum';
import { IDbRating } from '../../interfaces';
import { DbRatingMapper } from '../../mappers/rating.mapper';

@Injectable()
export class RatingsRepository
  extends Repository
  implements IRatingsRepository
{
  public async get_by_date(
    params: IGetRatingByDateParams,
  ): Promise<Rating | null> {
    const row = await this.connection
      .from(DbTable.Ratings)
      .where({
        chat_id: params.chat_id,
        date: params.date,
      })
      .first<IDbRating>();

    if (!row) {
      return null;
    }

    return DbRatingMapper.to_entity(row);
  }

  public async upsert(
    params: IUpsertRatingParams,
  ): Promise<Rating> {
    await this.connection
      .table(DbTable.Ratings)
      .insert({
        chat_id: params.chat_id,
        date: params.date,
        rating: params.rating,
      })
      .onConflict(['chat_id', 'date'])
      .merge({ rating: params.rating });

    const rating = await this.get_by_date({
      chat_id: params.chat_id,
      date: params.date,
    });

    if (!rating) {
      throw new Error('Rating was not upserted');
    }

    return rating;
  }

  public async list_all(chat_id: number): Promise<Rating[]> {
    const rows = await this.connection
      .from(DbTable.Ratings)
      .where({ chat_id })
      .orderBy('date', 'asc')
      .select<IDbRating[]>('*');

    return rows.map(DbRatingMapper.to_entity);
  }
}
