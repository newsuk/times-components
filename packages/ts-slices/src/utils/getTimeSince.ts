import get from 'lodash.get';
import {
  max,
  parse,
  isValid,
  distanceInWordsStrict,
  differenceInCalendarDays
} from 'date-fns';

import { SliceArticle } from '../types/slice';

export const getTimeSince = (article: SliceArticle) => {
  const published = parse(get(article, 'datePublished', ''));
  const updated = parse(get(article, 'dateUpdated', ''));
  const mostRecent = max(...[published, updated].filter(d => isValid(d)));

  const diff = differenceInCalendarDays(new Date(), mostRecent);

  if (!isValid(mostRecent) || diff >= 7) {
    return null;
  }

  return `${distanceInWordsStrict(new Date(), mostRecent)} ago`;
};
