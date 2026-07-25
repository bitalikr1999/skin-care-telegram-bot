export interface IListActivityKeysParams {
  chat_id: number;
  date: string;
}

export interface IAddActivityParams {
  chat_id: number;
  date: string;
  activity_key: string;
}

export interface IRemoveActivityParams {
  chat_id: number;
  date: string;
  activity_key: string;
}

export interface IDiaryActivitiesService {
  list_keys(params: IListActivityKeysParams): Promise<string[]>;
  add(params: IAddActivityParams): Promise<void>;
  remove(params: IRemoveActivityParams): Promise<void>;
}

export const DIARY_ACTIVITIES_SERVICE = Symbol(
  'DIARY_ACTIVITIES_SERVICE',
);
