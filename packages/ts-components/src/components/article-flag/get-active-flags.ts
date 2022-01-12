import { FlagType } from './ArticleFlag';

const getActiveArticleFlags: Function = (flags: FlagType[]) => {
  if (!flags) return [];
  return flags
    .map(
      flag =>
        flag.expiryTime === null ||
        new Date().getTime() < new Date(flag.expiryTime).getTime()
          ? flag
          : null
    )
    .filter(flag => flag !== null);
};

export default getActiveArticleFlags;
