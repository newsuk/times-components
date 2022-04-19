export const getIsLiveOrBreakingFlag = flags => {
  const liveOrBreaking = ["LIVE", "BREAKING"];
  let isObject;

  const findFlag =
    flags &&
    flags.find(flag => {
      if (typeof flag === "string") {
        isObject = false;
        return liveOrBreaking.includes(flag.toUpperCase());
      }
      isObject = true;
      return flag.type && liveOrBreaking.includes(flag.type.toUpperCase());
    });

  return isObject && findFlag ? findFlag.type : findFlag;
};

export const getActiveArticleFlags = flags => {
  if (!flags) {
    return [];
  }
  return flags.filter(
    flag =>
      flag.expiryTime === null ||
      new Date().getTime() < new Date(flag.expiryTime).getTime()
  );
};
