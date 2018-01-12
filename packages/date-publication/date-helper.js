const lastSunday = (month, year) => {
  const lastDayOfMonth = new Date(Date.UTC(year, month, 0));
  const day = lastDayOfMonth.getDay();
  const dateOfSunday = lastDayOfMonth.getDate() - day;
  const sunday = new Date(Date.UTC(year, month, dateOfSunday));
  sunday.setHours(1);
  return sunday.getTime();
};

const isBST = date => {
  const startOfBST = lastSunday(3, date.getFullYear());
  const endOfBST = lastSunday(10, date.getFullYear());
  const isAfterStartOfBST = date.getTime() >= startOfBST;
  const isBeforeEndOfBST = date.getTime() < endOfBST;
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
