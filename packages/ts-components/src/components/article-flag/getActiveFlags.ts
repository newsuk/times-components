import { FlagType } from './ArticleFlag';

const getActiveArticleFlags: (flags: FlagType) => FlagType = flags => {
  if (!flags) {
    return [];
  }
  return flags.filter(
    flag =>
      flag.expiryTime === null ||
      new Date().getTime() < new Date(flag.expiryTime).getTime()
  );
};

export default getActiveArticleFlags;
