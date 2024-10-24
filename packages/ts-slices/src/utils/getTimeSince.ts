import get from 'lodash.get';
import max from 'date-fns/max';
import parseISO from 'date-fns/parseISO';
import isValid from 'date-fns/isValid';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

import { SliceArticle } from '../types/slice';

export const getTimeSince = (article: SliceArticle) => {
  const published = parseISO(get(article, 'datePublished', ''));
  const updated = parseISO(get(article, 'dateUpdated', ''));
  const mostRecent = max([published, updated].filter(d => isValid(d)));

  const diff = differenceInCalendarDays(new Date(), mostRecent);

  if (!isValid(mostRecent) || diff >= 7) {
    return null;
  }

  return `${formatDistanceToNowStrict(mostRecent, {
    roundingMethod: 'floor'
  })} ago`;
};
