import React from 'react';
import {
  differenceInSeconds,
  differenceInCalendarDays,
  formatDistanceStrict
} from 'date-fns';
import { format, utcToZonedTime } from 'date-fns-tz';
/* tslint:disable-next-line */
import enGB from 'date-fns/locale/en-GB';

import { BreakingArticleFlag } from '../article-flag/LiveArticleFlag';
import safeDecodeURIComponent from '../../utils/safeDecodeURIComponent';

import {
  Container,
  Divider,
  Headline,
  TimeSincePublishing,
  TimeSincePublishingContainer,
  UpdatedDate,
  UpdatedTime,
  UpdatedTimeItems,
  UpdatesContainer,
  FlagContainer
} from './styles';

const anchorString = (updateTxt = '', headlineTxt = '') => {
  const onlyNumbersReg = /\D+/g;
  const onlyNumbers = updateTxt.replace(onlyNumbersReg, '');
  const acronymReg = /\b(\w)/g;
  const acronymMatch = headlineTxt.match(acronymReg);
  const acronym = acronymMatch === null ? '' : acronymMatch.join('');
  return `u_${onlyNumbers}${acronym}`;
};

const ArticleHeader: React.FC<{
  updated: string;
  breaking?: string;
  headline?: string;
}> = ({ updated, breaking, headline }) => {
  const currentDateTime = new Date();
  const updatedDate = new Date(updated);
  const parsedDate = utcToZonedTime(updatedDate, 'Europe/London');

  const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let timezone = '';

  if (currentTimezone === 'Europe/London') {
    timezone = 'zzz';
  }

  const timeSincePublishing =
    formatDistanceStrict(updatedDate, currentDateTime, {
      roundingMethod: 'floor'
    }) + ' ago';

  const diffInSeconds = differenceInSeconds(currentDateTime, updatedDate);
  const isLessThan1Minute = diffInSeconds < 60;
  const isLessThan1Hour = diffInSeconds < 60 * 60;
  const isLessThan13Hours = diffInSeconds < 60 * 60 * 13;

  const isDaysAgo = differenceInCalendarDays(currentDateTime, parsedDate) >= 1;

  const isBreaking = breaking
    ? Boolean(breaking.toLowerCase() === 'true')
    : false;

  const anchorPoint = anchorString(updated, headline);

  return (
    <Container isBreaking={isBreaking && isLessThan1Hour} id={anchorPoint}>
      <UpdatesContainer>
        <UpdatedTimeItems>
          {isBreaking && isLessThan1Hour ? (
            <FlagContainer>
              <BreakingArticleFlag />
            </FlagContainer>
          ) : null}

          {!isLessThan1Minute && isLessThan13Hours ? (
            <TimeSincePublishingContainer>
              <TimeSincePublishing data-testId="TimeSincePublishing">
                {timeSincePublishing}
              </TimeSincePublishing>
              <Divider />
            </TimeSincePublishingContainer>
          ) : null}

          <UpdatedTime
            isLessThan13Hours={!isLessThan1Minute && isLessThan13Hours}
          >
            {format(parsedDate, `h.mmaaa ${timezone}`, { locale: enGB })}
          </UpdatedTime>
        </UpdatedTimeItems>

        {isDaysAgo ? (
          <UpdatedDate>{format(parsedDate, 'MMMM d')}</UpdatedDate>
        ) : null}
      </UpdatesContainer>

      {headline && <Headline>{safeDecodeURIComponent(headline)}</Headline>}
    </Container>
  );
};

export default ArticleHeader;
