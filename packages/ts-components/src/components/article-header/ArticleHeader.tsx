import React, { useState, useEffect } from 'react';
import {
  differenceInSeconds,
  differenceInCalendarDays,
  formatDistanceStrict
} from 'date-fns';
import { format, utcToZonedTime } from 'date-fns-tz';

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
import { ArticleByline } from '../../types/related-article-slice';
import { ArticleBylineBlock } from './ArticleBylineBlock';

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
  authorSlug?: string;
  description?: string;
}> = ({ updated, breaking, headline, authorSlug, description }) => {
  const [timezone, setTimezone] = useState<string>('');
  const [bylineData, setBylineData] = useState<ArticleByline | null>(null);

  const currentDateTime = new Date();
  const updatedDate = new Date(updated);

  const timeZone = 'Europe/London';
  const parsedDate = utcToZonedTime(updatedDate, timeZone);

  useEffect(() => {
    const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (currentTimezone !== timeZone) {
      setTimezone(format(parsedDate, 'zzz', { timeZone }));
    }
  });

  useEffect(
    () => {
      if (authorSlug) {
        // TODO: fetch the data
        setBylineData({
          slug: authorSlug,
          name: 'Oliver Wright',
          jobTitle: 'Policy Editor',
          image:
            'https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F043bbdb4-f8df-4856-92a4-132cc1524cb9.jpg?crop=668%2C668%2C0%2C0&resize=200'
        });
      }
    },
    [authorSlug]
  );

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
            {`${format(parsedDate, 'h.mmaaa')} ${timezone}`}
          </UpdatedTime>
        </UpdatedTimeItems>

        {isDaysAgo ? (
          <UpdatedDate>{format(parsedDate, 'MMMM d')}</UpdatedDate>
        ) : null}
      </UpdatesContainer>

      {headline && <Headline>{safeDecodeURIComponent(headline)}</Headline>}
      <ArticleBylineBlock data={bylineData} description={description} />
    </Container>
  );
};

export default ArticleHeader;
