import { Activity } from '../entities/activity/activity.entity';

export interface IActivitiesRepository {
  list_all(): Promise<Activity[]>;
  get_by_key(key: string): Promise<Activity | null>;
}
