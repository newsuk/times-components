export const getActiveArticleFlags = flags => {
  if (!flags) {
    return [];
  }
  const findFlag = flags.find(
    flag => new Date().getTime() < new Date(flag.expiryTime).getTime()
  );
  return findFlag && findFlag.type && findFlag.type.toLowerCase();
};

export const getIsLiveOrBreakingFlag = flags => {
  const liveOrBreaking = ["LIVE", "BREAKING"];

  const findFlag =
    flags &&
    flags.find(flag => liveOrBreaking.includes(flag.type.toUpperCase()));

  return findFlag && findFlag.type;
};