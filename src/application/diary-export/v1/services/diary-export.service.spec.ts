import { Activity } from '@domain/entities/activity/activity.entity';
import { ActivityRecord } from '@domain/entities/activity-record/activity-record.entity';
import { Rating } from '@domain/entities/rating/rating.entity';
import { Symptom } from '@domain/entities/symptom/symptom.entity';
import { SymptomRecord } from '@domain/entities/symptom-record/symptom-record.entity';

import { DiaryExportService } from './diary-export.service';

describe('DiaryExportService', () => {
  const ratings_repository = { list_all: vi.fn() };
  const activity_records_repository = { list_all: vi.fn() };
  const symptom_records_repository = { list_all: vi.fn() };
  const activities_repository = { list_all: vi.fn() };
  const symptoms_repository = { list_all: vi.fn() };

  const service = new DiaryExportService(
    ratings_repository as any,
    activity_records_repository as any,
    symptom_records_repository as any,
    activities_repository as any,
    symptoms_repository as any,
  );

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('build_csv', () => {
    it('should build csv with labels and escaped values', async () => {
      ratings_repository.list_all.mockResolvedValue([
        new Rating({
          chat_id: 7,
          date: '2026-07-25',
          rating: 8,
        }),
      ]);
      activity_records_repository.list_all.mockResolvedValue([
        new ActivityRecord({
          chat_id: 7,
          date: '2026-07-25',
          activity_key: 'honey',
        }),
        new ActivityRecord({
          chat_id: 7,
          date: '2026-07-25',
          activity_key: 'dairy',
        }),
      ]);
      symptom_records_repository.list_all.mockResolvedValue([
        new SymptomRecord({
          chat_id: 7,
          date: '2026-07-24',
          symptom_key: 'itch',
        }),
      ]);
      activities_repository.list_all.mockResolvedValue([
        new Activity({
          key: 'honey',
          label: 'мед, натуральний',
          category_key: 'food',
          category_label: 'Їжа',
        }),
        new Activity({
          key: 'dairy',
          label: 'молочні',
          category_key: 'food',
          category_label: 'Їжа',
        }),
      ]);
      symptoms_repository.list_all.mockResolvedValue([
        new Symptom({
          key: 'itch',
          label: 'свербіж',
          category_key: 'skin',
          category_label: 'Шкіра',
        }),
      ]);

      const file = await service.build_csv({ chat_id: 7 });

      expect(file.filename).toStrictEqual(
        'skin-diary-7.csv',
      );
      expect(file.content).toContain(
        'date,rating,activities,symptoms',
      );
      expect(file.content).toContain('2026-07-24,,');
      expect(file.content).toContain('свербіж');
      expect(file.content).toContain(
        '"мед, натуральний; молочні"',
      );
      expect(file.content).toContain('2026-07-25,8,');
    });
  });
});
