import { ISymptom } from './symptom.types';

export class Symptom {
  public readonly key: string;
  public readonly label: string;
  public readonly category_key: string;
  public readonly category_label: string;

  constructor(params: ISymptom) {
    this.key = params.key;
    this.label = params.label;
    this.category_key = params.category_key;
    this.category_label = params.category_label;
  }
}
