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
import { ArticleBylineAuthorData } from '../../types/related-article-slice';
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
  const [authorData, setAuthorData] = useState<ArticleBylineAuthorData>();

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
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/author-profile/${authorSlug}`);
          const authorDetails = await response.json();
          setAuthorData(authorDetails);
        } catch (err) {
          // tslint:disable-next-line:no-console
          console.log(err);
        }
      };

      fetchData();
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
      <ArticleBylineBlock authorData={authorData} description={description} />
    </Container>
  );
};

export default ArticleHeader;
