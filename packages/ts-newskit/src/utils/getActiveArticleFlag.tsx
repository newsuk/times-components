import { expirableFlagsProps } from '../slices/types';

export const getActiveArticleFlags = (flags: expirableFlagsProps[]) => {
  const findFlag = flags.find(
    (flag) =>
      flag.expiryTime === null ||
      (flag.expiryTime !== undefined &&
        new Date().getTime() < new Date(flag.expiryTime).getTime()),
  );

  return findFlag && findFlag.type;
};
