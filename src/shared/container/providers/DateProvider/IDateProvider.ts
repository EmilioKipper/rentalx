interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  compareInDays(state_date: Date, end_date: Date): number;
  dateNow(): Date;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  isBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };
