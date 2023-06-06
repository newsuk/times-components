export const convertDateToWeekday = (date: string) => {
  const timestamp = new Date(date);
  let cardDate = formatDateToString(timestamp);

  const currentDate = new Date();
  const currentDayOfWeek = formatDateToString(currentDate);

  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayDayOfWeek = formatDateToString(yesterdayDate);

  if (cardDate === currentDayOfWeek) {
    cardDate = 'Today';
  } else if (cardDate === yesterdayDayOfWeek) {
    cardDate = 'Yesterday';
  }

  return cardDate.replace(',', '');
};

const formatDateToString = (date: Date) => {
  return date.toLocaleString('en-us', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
};
