export interface IActivityCorrelation {
  activity_key: string;
  avg_with: number;
  avg_without: number;
  diff: number;
}

export interface IStatisticsResult {
  correlations: IActivityCorrelation[];
  top_negative: IActivityCorrelation[];
  top_positive: IActivityCorrelation[];
}

export interface IRatedDay {
  date: string;
  rating: number;
  activity_keys: string[];
}
