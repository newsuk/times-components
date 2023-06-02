export const formatDate = (date: string) => {
  let outputDate;
  const timestamp = new Date(date);
  const cardDate = timestamp.toLocaleString('en-us', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
  const currentDate = new Date();
  const currentDayOfWeek = currentDate.toLocaleString('en-us', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayDayOfWeek = yesterdayDate.toLocaleString('en-us', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  if (cardDate === currentDayOfWeek) {
    outputDate = 'Today';
  } else if (cardDate === yesterdayDayOfWeek) {
    outputDate = 'Yesterday';
  } else {
    outputDate = cardDate;
  }

  return outputDate.replace(',', '');
};
