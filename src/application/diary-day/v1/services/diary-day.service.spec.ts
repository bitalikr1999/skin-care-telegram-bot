import { Rating } from '@domain/entities/rating/rating.entity';
import { ActivityRecord } from '@domain/entities/activity-record/activity-record.entity';
import { SymptomRecord } from '@domain/entities/symptom-record/symptom-record.entity';

import { DiaryDayService } from './diary-day.service';

describe('DiaryDayService', () => {
  const ratings_repository = {
    get_by_date: vi.fn(),
  };
  const activity_records_repository = {
    list_by_date: vi.fn(),
  };
  const symptom_records_repository = {
    list_by_date: vi.fn(),
  };

  const service = new DiaryDayService(
    ratings_repository as any,
    activity_records_repository as any,
    symptom_records_repository as any,
  );

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('get', () => {
    it('should aggregate day record from repositories', async () => {
      ratings_repository.get_by_date.mockResolvedValue(
        new Rating({
          chat_id: 1,
          date: '2026-07-25',
          rating: 8,
        }),
      );
      activity_records_repository.list_by_date.mockResolvedValue([
        new ActivityRecord({
          chat_id: 1,
          date: '2026-07-25',
          activity_key: 'honey',
        }),
      ]);
      symptom_records_repository.list_by_date.mockResolvedValue([
        new SymptomRecord({
          chat_id: 1,
          date: '2026-07-25',
          symptom_key: 'itch',
        }),
      ]);

      await expect(
        service.get({ chat_id: 1, date: '2026-07-25' }),
      ).resolves.toEqual(
        expect.objectContaining({
          chat_id: 1,
          date: '2026-07-25',
          rating: 8,
          activity_keys: ['honey'],
          symptom_keys: ['itch'],
        }),
      );
    });

    it('should use null rating when missing', async () => {
      ratings_repository.get_by_date.mockResolvedValue(null);
      activity_records_repository.list_by_date.mockResolvedValue(
        [],
      );
      symptom_records_repository.list_by_date.mockResolvedValue(
        [],
      );

      const day = await service.get({
        chat_id: 1,
        date: '2026-07-25',
      });

      expect(day.rating).toStrictEqual(null);
      expect(day.activity_keys).toStrictEqual([]);
      expect(day.symptom_keys).toStrictEqual([]);
    });
  });
});
