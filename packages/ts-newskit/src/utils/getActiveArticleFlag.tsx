import { expirableFlagsProps } from '../components/slices/shared/articleTileInfo';

export const getActiveArticleFlags = (flags: expirableFlagsProps[]) => {
  const findFlag = flags.find(
    flag =>
      flag.expiryTime === null ||
      (flag.expiryTime !== undefined &&
        new Date().getTime() < new Date(flag.expiryTime).getTime())
  );

  return findFlag && findFlag.type;
};
