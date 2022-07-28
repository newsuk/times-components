import { format, addMinutes } from 'date-fns';

const lastSunday = (month: number, year: number) => {
  const lastDayOfMonth = new Date(Date.UTC(year, month + 1, 0));
  const day = lastDayOfMonth.getDay();
  const dateOfSunday = lastDayOfMonth.getDate() - day;
  const sunday = new Date(Date.UTC(year, month, dateOfSunday));
  sunday.setHours(1);
  return sunday;
};

const isBST = (date: Date) => {
  const startOfBST = lastSunday(2, date.getFullYear());
  const endOfBST = lastSunday(9, date.getFullYear());
  const isAfterStartOfBST = date.getTime() >= startOfBST.getTime();
  const isBeforeEndOfBST = date.getTime() < endOfBST.getTime();
  return isAfterStartOfBST && isBeforeEndOfBST;
};

const getUTCTime = (date: string) => {
  const localDate = new Date(date);
  return new Date(
    localDate.getUTCFullYear(),
    localDate.getUTCMonth(),
    localDate.getUTCDate(),
    localDate.getUTCHours(),
    localDate.getUTCMinutes()
  );
};

export const getDate = (iso?: string) => {
  if (iso) {
    const utc = getUTCTime(iso);
    const date = addMinutes(utc, isBST(utc) ? 60 : 0);
    return format(date, 'MMMM dd yyyy, h.mmaaa');
  }

  return null;
};
