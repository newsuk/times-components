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

export const getActiveArticleFlag = flags => {
  const activeFlags = flags.filter(
    flag =>
      flag.expiryTime === null ||
      new Date().getTime() < new Date(flag.expiryTime).getTime()
  );
  let isObject;
  const findFlag =
    activeFlags &&
    activeFlags.find(flag => {
      if (typeof flag === "string") {
        isObject = false;
        return flag
      }
      isObject = true;
      return flag.type
    });
  return isObject && findFlag ? findFlag.type : findFlag;
};
