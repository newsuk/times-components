import { convertDateToWeekday } from '../index';

describe('convertDateToWeekday', () => {
  it('should return "Today" when the input date is the current date', () => {
    expect(convertDateToWeekday(new Date().toString())).toBe('Today');
  });

  it('should return "Yesterday" when the input date is one day before the current date', () => {
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    expect(convertDateToWeekday(yesterdayDate.toString())).toBe('Yesterday');
  });
});
