const getTimezone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (err) {
    return "";
  }
};

export default getTimezone;
