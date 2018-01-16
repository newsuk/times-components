const lastSunday = (month, year) => {
  const lastDayOfMonth = new Date(Date.UTC(year, month + 1, 0));
  const day = lastDayOfMonth.getDay();
  const dateOfSunday = lastDayOfMonth.getDate() - day;
  const sunday = new Date(Date.UTC(year, month, dateOfSunday));
  sunday.setHours(1);
  return sunday;
};

const isBST = date => {
  const startOfBST = lastSunday(2, date.getFullYear());
  const endOfBST = lastSunday(9, date.getFullYear());
  const isAfterStartOfBST = date.getTime() >= startOfBST.getTime();
  const isBeforeEndOfBST = date.getTime() < endOfBST.getTime();
  return isAfterStartOfBST && isBeforeEndOfBST;
};

const getUTCTime = date => {
  const localDate = new Date(date);
  return new Date(
    localDate.getUTCFullYear(),
    localDate.getUTCMonth(),
    localDate.getUTCDate(),
    localDate.getUTCHours(),
    localDate.getUTCMinutes()
  );
};

const isLondonTimezone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone === "Europe/London";
  } catch (err) {
    return false;
  }
};

export { isLondonTimezone, getUTCTime, isBST };
