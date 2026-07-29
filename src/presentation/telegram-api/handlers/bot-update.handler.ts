import { Inject, Injectable } from '@nestjs/common';

import {
  DIARY_ACTIVITIES_SERVICE,
  IDiaryActivitiesService,
} from '@application/diary-activities/ports/diary-activities.port';
import {
  DIARY_DAY_SERVICE,
  IDiaryDayService,
} from '@application/diary-day/ports/diary-day.port';
import {
  DIARY_EXPORT_SERVICE,
  IDiaryExportService,
} from '@application/diary-export/ports/diary-export.port';
import {
  DIARY_RATING_SERVICE,
  IDiaryRatingService,
} from '@application/diary-rating/ports/diary-rating.port';
import {
  DIARY_STATISTICS_SERVICE,
  IDiaryStatisticsService,
} from '@application/diary-statistics/ports/diary-statistics.port';
import {
  DIARY_SYMPTOM_STATS_SERVICE,
  IDiarySymptomStatsService,
} from '@application/diary-symptom-stats/ports/diary-symptom-stats.port';
import {
  DIARY_SYMPTOMS_SERVICE,
  IDiarySymptomsService,
} from '@application/diary-symptoms/ports/diary-symptoms.port';
import {
  ACTIVITIES_REPOSITORY,
  SYMPTOMS_REPOSITORY,
} from '@domain/consts/repository-tokens.const';
import { StatsPeriod } from '@domain/consts/stats-period.const';
import {
  IBotIncomingCallback,
  IBotIncomingCommand,
  IBotUpdateHandler,
  IBotView,
} from '@domain/interfaces/bot-ui.interface';
import {
  IActivitiesRepository,
  ISymptomsRepository,
} from '@domain/repositories';
import { CatalogGroupUtils } from '@domain/utils/catalog-group.util';
import { DateUtils } from '@domain/utils/date.util';
import { RatingUtils } from '@domain/utils/rating.util';

import {
  BackKeyboard,
  CatalogKeyboard,
  MenuKeyboard,
  RatingKeyboard,
  SymptomStatsPeriodKeyboard,
} from '../keyboards/bot.keyboards';
import {
  DayRecordTextMapper,
  StatisticsTextMapper,
  SymptomStatsTextMapper,
} from '../mappers/view-text.mapper';
import { CallbackRouter } from '../routers/callback.router';

@Injectable()
export class BotUpdateHandler implements IBotUpdateHandler {
  constructor(
    @Inject(DIARY_ACTIVITIES_SERVICE)
    private readonly activities_service: IDiaryActivitiesService,
    @Inject(DIARY_SYMPTOMS_SERVICE)
    private readonly symptoms_service: IDiarySymptomsService,
    @Inject(DIARY_RATING_SERVICE)
    private readonly rating_service: IDiaryRatingService,
    @Inject(DIARY_DAY_SERVICE)
    private readonly day_service: IDiaryDayService,
    @Inject(DIARY_STATISTICS_SERVICE)
    private readonly statistics_service: IDiaryStatisticsService,
    @Inject(DIARY_SYMPTOM_STATS_SERVICE)
    private readonly symptom_stats_service: IDiarySymptomStatsService,
    @Inject(DIARY_EXPORT_SERVICE)
    private readonly export_service: IDiaryExportService,
    @Inject(ACTIVITIES_REPOSITORY)
    private readonly activities_repository: IActivitiesRepository,
    @Inject(SYMPTOMS_REPOSITORY)
    private readonly symptoms_repository: ISymptomsRepository,
  ) {}

  public async handle_command(
    params: IBotIncomingCommand,
  ): Promise<IBotView> {
    if (params.command === 'start' || params.command === 'menu') {
      return this._menu_view();
    }

    return {
      text: 'Невідома команда. Спробуй /menu',
      buttons: MenuKeyboard.build(),
    };
  }

  public async handle_callback(
    params: IBotIncomingCallback,
  ): Promise<IBotView> {
    const action = CallbackRouter.parse(params.data);
    const date = DateUtils.today();

    switch (action.kind) {
      case 'nav_menu':
      case 'done_menu':
        return this._menu_view(params.message_id);
      case 'nav_activities':
        return this._activity_categories_view({
          message_id: params.message_id,
        });
      case 'nav_act_category':
        return this._activity_items_view({
          chat_id: params.chat_id,
          date,
          category_key: action.category_key,
          message_id: params.message_id,
          markup_only: false,
        });
      case 'act_toggle': {
        const selected = await this.activities_service.list_keys({
          chat_id: params.chat_id,
          date,
        });
        if (selected.includes(action.activity_key)) {
          await this.activities_service.remove({
            chat_id: params.chat_id,
            date,
            activity_key: action.activity_key,
          });
        } else {
          await this.activities_service.add({
            chat_id: params.chat_id,
            date,
            activity_key: action.activity_key,
          });
        }

        const activities =
          await this.activities_repository.list_all();
        const activity = activities.find(
          (item) => item.key === action.activity_key,
        );
        if (!activity) {
          return this._activity_categories_view({
            message_id: params.message_id,
          });
        }

        return this._activity_items_view({
          chat_id: params.chat_id,
          date,
          category_key: activity.category_key,
          message_id: params.message_id,
          markup_only: true,
        });
      }
      case 'nav_symptoms':
        return this._symptom_categories_view({
          message_id: params.message_id,
        });
      case 'nav_sym_category':
        return this._symptom_items_view({
          chat_id: params.chat_id,
          date,
          category_key: action.category_key,
          message_id: params.message_id,
          markup_only: false,
        });
      case 'sym_toggle': {
        const selected = await this.symptoms_service.list_keys({
          chat_id: params.chat_id,
          date,
        });
        if (selected.includes(action.symptom_key)) {
          await this.symptoms_service.remove({
            chat_id: params.chat_id,
            date,
            symptom_key: action.symptom_key,
          });
        } else {
          await this.symptoms_service.add({
            chat_id: params.chat_id,
            date,
            symptom_key: action.symptom_key,
          });
        }

        const symptoms = await this.symptoms_repository.list_all();
        const symptom = symptoms.find(
          (item) => item.key === action.symptom_key,
        );
        if (!symptom) {
          return this._symptom_categories_view({
            message_id: params.message_id,
          });
        }

        return this._symptom_items_view({
          chat_id: params.chat_id,
          date,
          category_key: symptom.category_key,
          message_id: params.message_id,
          markup_only: true,
        });
      }
      case 'nav_rating':
        return this._rating_view({
          chat_id: params.chat_id,
          date,
          message_id: params.message_id,
        });
      case 'rat_set':
        if (!RatingUtils.is_valid(action.rating)) {
          return this._menu_view(params.message_id);
        }
        await this.rating_service.upsert({
          chat_id: params.chat_id,
          date,
          rating: action.rating,
        });
        return this._rating_view({
          chat_id: params.chat_id,
          date,
          message_id: params.message_id,
        });
      case 'nav_today':
        return this._today_view({
          chat_id: params.chat_id,
          date,
          message_id: params.message_id,
        });
      case 'nav_stats_rating':
        return this._rating_stats_view({
          chat_id: params.chat_id,
          message_id: params.message_id,
        });
      case 'nav_stats_symptoms':
        return this._symptom_stats_period_view(params.message_id);
      case 'stats_period':
        return this._symptom_stats_view({
          chat_id: params.chat_id,
          period: action.period,
          message_id: params.message_id,
        });
      case 'nav_export':
        return this._export_view(params.chat_id);
      default:
        return this._menu_view(params.message_id);
    }
  }

  private _menu_view(message_id?: number): IBotView {
    return {
      text: 'SkinLog — головне меню',
      buttons: MenuKeyboard.build(),
      edit_message_id: message_id,
    };
  }

  private async _activity_categories_view(params: {
    message_id: number;
  }): Promise<IBotView> {
    const activities = await this.activities_repository.list_all();

    return {
      text: '➕ Обери категорію активностей',
      buttons:
        CatalogKeyboard.build_activity_categories(activities),
      edit_message_id: params.message_id,
    };
  }

  private async _activity_items_view(params: {
    chat_id: number;
    date: string;
    category_key: string;
    message_id: number;
    markup_only: boolean;
  }): Promise<IBotView> {
    const [activities, selected_keys] = await Promise.all([
      this.activities_repository.list_all(),
      this.activities_service.list_keys({
        chat_id: params.chat_id,
        date: params.date,
      }),
    ]);

    const category_label = CatalogGroupUtils.find_category_label({
      items: activities,
      category_key: params.category_key,
    });
    if (!category_label) {
      return this._activity_categories_view({
        message_id: params.message_id,
      });
    }

    return {
      text: `➕ ${category_label}`,
      buttons: CatalogKeyboard.build_activity_items({
        activities,
        selected_keys,
        category_key: params.category_key,
      }),
      edit_message_id: params.message_id,
      edit_reply_markup_only: params.markup_only,
    };
  }

  private async _symptom_categories_view(params: {
    message_id: number;
  }): Promise<IBotView> {
    const symptoms = await this.symptoms_repository.list_all();

    return {
      text: '🩺 Обери категорію симптомів',
      buttons: CatalogKeyboard.build_symptom_categories(symptoms),
      edit_message_id: params.message_id,
    };
  }

  private async _symptom_items_view(params: {
    chat_id: number;
    date: string;
    category_key: string;
    message_id: number;
    markup_only: boolean;
  }): Promise<IBotView> {
    const [symptoms, selected_keys] = await Promise.all([
      this.symptoms_repository.list_all(),
      this.symptoms_service.list_keys({
        chat_id: params.chat_id,
        date: params.date,
      }),
    ]);

    const category_label = CatalogGroupUtils.find_category_label({
      items: symptoms,
      category_key: params.category_key,
    });
    if (!category_label) {
      return this._symptom_categories_view({
        message_id: params.message_id,
      });
    }

    return {
      text: `🩺 ${category_label}`,
      buttons: CatalogKeyboard.build_symptom_items({
        symptoms,
        selected_keys,
        category_key: params.category_key,
      }),
      edit_message_id: params.message_id,
      edit_reply_markup_only: params.markup_only,
    };
  }

  private async _rating_view(params: {
    chat_id: number;
    date: string;
    message_id: number;
  }): Promise<IBotView> {
    const current_rating = await this.rating_service.get({
      chat_id: params.chat_id,
      date: params.date,
    });

    return {
      text: '📊 Оціни стан шкіри (1–10)',
      buttons: RatingKeyboard.build(current_rating),
      edit_message_id: params.message_id,
    };
  }

  private async _today_view(params: {
    chat_id: number;
    date: string;
    message_id: number;
  }): Promise<IBotView> {
    const [day, activities, symptoms] = await Promise.all([
      this.day_service.get({
        chat_id: params.chat_id,
        date: params.date,
      }),
      this.activities_repository.list_all(),
      this.symptoms_repository.list_all(),
    ]);

    return {
      text: DayRecordTextMapper.to_text({
        day,
        activities,
        symptoms,
      }),
      buttons: BackKeyboard.build(),
      edit_message_id: params.message_id,
    };
  }

  private async _rating_stats_view(params: {
    chat_id: number;
    message_id: number;
  }): Promise<IBotView> {
    const [stats, activities] = await Promise.all([
      this.statistics_service.get({ chat_id: params.chat_id }),
      this.activities_repository.list_all(),
    ]);

    return {
      text: StatisticsTextMapper.to_text({ stats, activities }),
      buttons: BackKeyboard.build(),
      edit_message_id: params.message_id,
    };
  }

  private _symptom_stats_period_view(
    message_id: number,
  ): IBotView {
    return {
      text: '🔍 Симптоми разом — обери період',
      buttons: SymptomStatsPeriodKeyboard.build(),
      edit_message_id: message_id,
    };
  }

  private async _symptom_stats_view(params: {
    chat_id: number;
    period: StatsPeriod;
    message_id: number;
  }): Promise<IBotView> {
    const [stats, activities, symptoms] = await Promise.all([
      this.symptom_stats_service.get({
        chat_id: params.chat_id,
        period: params.period,
      }),
      this.activities_repository.list_all(),
      this.symptoms_repository.list_all(),
    ]);

    return {
      text: SymptomStatsTextMapper.to_text({
        period: params.period,
        stats,
        activities,
        symptoms,
      }),
      buttons: SymptomStatsPeriodKeyboard.build(),
      edit_message_id: params.message_id,
    };
  }

  private async _export_view(chat_id: number): Promise<IBotView> {
    const file = await this.export_service.build_csv({ chat_id });

    return {
      text: '📤 Експорт CSV',
      document: {
        filename: file.filename,
        buffer: Buffer.from(file.content, 'utf8'),
      },
      buttons: BackKeyboard.build(),
    };
  }
}
