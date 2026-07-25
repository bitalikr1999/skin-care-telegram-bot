import { StatsPeriod } from '../consts/stats-period.const';

export class DateUtils {
  public static today(): string {
    return DateUtils._format(new Date());
  }

  public static shift(
    date: string,
    days_delta: number,
  ): string {
    const [year, month, day] = date.split('-').map(Number);
    const value = new Date(year, month - 1, day);
    value.setDate(value.getDate() + days_delta);
    return DateUtils._format(value);
  }

  public static period_start(
    period: StatsPeriod,
    to_date = DateUtils.today(),
  ): string | null {
    if (period === 'week') {
      return DateUtils.shift(to_date, -6);
    }
    if (period === 'month') {
      return DateUtils.shift(to_date, -29);
    }
    if (period === 'quarter') {
      return DateUtils.shift(to_date, -89);
    }
    return null;
  }

  private static _format(value: Date): string {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
