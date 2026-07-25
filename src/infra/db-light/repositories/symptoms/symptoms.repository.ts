import { Injectable } from '@nestjs/common';

import { Symptom } from '@domain/entities/symptom/symptom.entity';
import { ISymptomsRepository } from '@domain/repositories';
import { Repository } from '../../abstracts';
import { DbTable } from '../../enums/table.enum';
import { IDbSymptom } from '../../interfaces';
import { DbSymptomMapper } from '../../mappers/symptom.mapper';

@Injectable()
export class SymptomsRepository
  extends Repository
  implements ISymptomsRepository
{
  public async list_all(): Promise<Symptom[]> {
    const rows = await this.connection
      .from(DbTable.Symptoms)
      .select<IDbSymptom[]>('*');

    return rows.map(DbSymptomMapper.to_entity);
  }

  public async get_by_key(key: string): Promise<Symptom | null> {
    const row = await this.connection
      .from(DbTable.Symptoms)
      .where({ key })
      .first<IDbSymptom>();

    if (!row) {
      return null;
    }

    return DbSymptomMapper.to_entity(row);
  }
}
