import { ActivityRecord } from '@domain/entities/activity-record/activity-record.entity';
import { SymptomRecord } from '@domain/entities/symptom-record/symptom-record.entity';
import { DateUtils } from '@domain/utils/date.util';

import { DiarySymptomStatsService } from './diary-symptom-stats.service';

describe('DiarySymptomStatsService', () => {
  const symptom_records_repository = {
    list_all: vi.fn(),
  };
  const activity_records_repository = {
    list_all: vi.fn(),
  };

  const service = new DiarySymptomStatsService(
    symptom_records_repository as any,
    activity_records_repository as any,
  );

  afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  describe('get', () => {
    it('should filter by period and compute cooccurrences', async () => {
      vi.spyOn(DateUtils, 'today').mockReturnValue(
        '2026-07-25',
      );

      symptom_records_repository.list_all.mockResolvedValue([
        new SymptomRecord({
          chat_id: 1,
          date: '2026-07-25',
          symptom_key: 'itch',
        }),
        new SymptomRecord({
          chat_id: 1,
          date: '2026-07-24',
          symptom_key: 'itch',
        }),
        new SymptomRecord({
          chat_id: 1,
          date: '2026-07-23',
          symptom_key: 'itch',
        }),
        new SymptomRecord({
          chat_id: 1,
          date: '2026-07-23',
          symptom_key: 'redness',
        }),
        new SymptomRecord({
          chat_id: 1,
          date: '2026-01-01',
          symptom_key: 'itch',
        }),
      ]);
      activity_records_repository.list_all.mockResolvedValue([
        new ActivityRecord({
          chat_id: 1,
          date: '2026-07-25',
          activity_key: 'honey',
        }),
        new ActivityRecord({
          chat_id: 1,
          date: '2026-07-24',
          activity_key: 'honey',
        }),
        new ActivityRecord({
          chat_id: 1,
          date: '2026-07-23',
          activity_key: 'honey',
        }),
      ]);

      const result = await service.get({
        chat_id: 1,
        period: 'week',
      });

      expect(result).not.toBeNull();
      expect(result![0].symptom_key).toStrictEqual('itch');
      expect(result![0].days).toStrictEqual(3);
      expect(result![0].activities[0].key).toStrictEqual(
        'honey',
      );
    });

    it('should return null when not enough symptom days', async () => {
      vi.spyOn(DateUtils, 'today').mockReturnValue(
        '2026-07-25',
      );

      symptom_records_repository.list_all.mockResolvedValue([
        new SymptomRecord({
          chat_id: 1,
          date: '2026-07-25',
          symptom_key: 'itch',
        }),
      ]);
      activity_records_repository.list_all.mockResolvedValue([]);

      await expect(
        service.get({ chat_id: 1, period: 'all' }),
      ).resolves.toStrictEqual(null);
    });
  });
});
