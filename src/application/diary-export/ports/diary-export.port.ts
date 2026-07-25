export interface IBuildCsvParams {
  chat_id: number;
}

export interface ICsvExport {
  filename: string;
  content: string;
}

export interface IDiaryExportService {
  build_csv(params: IBuildCsvParams): Promise<ICsvExport>;
}

export const DIARY_EXPORT_SERVICE = Symbol('DIARY_EXPORT_SERVICE');
