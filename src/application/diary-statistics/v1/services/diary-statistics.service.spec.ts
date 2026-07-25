import { Rating } from '@domain/entities/rating/rating.entity';
import { ActivityRecord } from '@domain/entities/activity-record/activity-record.entity';

import { DiaryStatisticsService } from './diary-statistics.service';

describe('DiaryStatisticsService', () => {
  const ratings_repository = {
    list_all: vi.fn(),
  };
  const activity_records_repository = {
    list_all: vi.fn(),
  };

  const service = new DiaryStatisticsService(
    ratings_repository as any,
    activity_records_repository as any,
  );

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('get', () => {
    it('should return null when not enough rated days', async () => {
      ratings_repository.list_all.mockResolvedValue([
        new Rating({
          chat_id: 1,
          date: '2026-01-01',
          rating: 5,
        }),
      ]);
      activity_records_repository.list_all.mockResolvedValue([]);

      await expect(
        service.get({ chat_id: 1 }),
      ).resolves.toStrictEqual(null);
    });

    it('should group activities by date before correlation', async () => {
      ratings_repository.list_all.mockResolvedValue([
        new Rating({
          chat_id: 1,
          date: '2026-01-01',
          rating: 3,
        }),
        new Rating({
          chat_id: 1,
          date: '2026-01-02',
          rating: 2,
        }),
        new Rating({
          chat_id: 1,
          date: '2026-01-03',
          rating: 8,
        }),
        new Rating({
          chat_id: 1,
          date: '2026-01-04',
          rating: 9,
        }),
        new Rating({
          chat_id: 1,
          date: '2026-01-05',
          rating: 5,
        }),
        new Rating({
          chat_id: 1,
          date: '2026-01-06',
          rating: 6,
        }),
      ]);
      activity_records_repository.list_all.mockResolvedValue([
        new ActivityRecord({
          chat_id: 1,
          date: '2026-01-01',
          activity_key: 'bad',
        }),
        new ActivityRecord({
          chat_id: 1,
          date: '2026-01-02',
          activity_key: 'bad',
        }),
        new ActivityRecord({
          chat_id: 1,
          date: '2026-01-03',
          activity_key: 'good',
        }),
        new ActivityRecord({
          chat_id: 1,
          date: '2026-01-04',
          activity_key: 'good',
        }),
      ]);

      const result = await service.get({ chat_id: 1 });

      expect(result).not.toBeNull();
      expect(result!.top_negative[0].activity_key).toStrictEqual(
        'bad',
      );
      expect(result!.top_positive[0].activity_key).toStrictEqual(
        'good',
      );
    });
  });
});
