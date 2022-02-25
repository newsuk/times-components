import React from 'react';
import {
  format,
  differenceInSeconds,
  differenceInCalendarDays,
  formatDistanceStrict
} from 'date-fns';

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
import { BreakingArticleFlag } from '../article-flag/LiveArticleFlag';
import safeDecodeURIComponent from '../../utils/safeDecodeURIComponent';

const ArticleHeader: React.FC<{
  updated: string;
  breaking?: string;
  headline?: string;
}> = ({ updated, breaking, headline }) => {
  const currentDateTime = new Date();
  const updatedDate = new Date(updated);
  const timeSincePublishing =
    formatDistanceStrict(updatedDate, currentDateTime, {
      roundingMethod: 'floor'
    }) + ' ago';
  const diffInSeconds = differenceInSeconds(currentDateTime, updatedDate);

  const isLessThan1Minute = diffInSeconds < 60;
  const isLessThan1Hour = diffInSeconds < 60 * 60;
  const isLessThan13Hours = diffInSeconds < 60 * 60 * 13;
  const isDaysAgo = differenceInCalendarDays(currentDateTime, updatedDate) >= 1;

  const isBreaking = breaking
    ? Boolean(breaking.toLowerCase() === 'true')
    : false;

  return (
    <Container isBreaking={isBreaking && isLessThan1Hour}>
      <UpdatesContainer>
        <UpdatedTimeItems>
          {isBreaking && isLessThan1Hour ? (
            <FlagContainer>
              <BreakingArticleFlag />
            </FlagContainer>
          ) : null}
          {!isLessThan1Minute && isLessThan13Hours ? (
            <TimeSincePublishingContainer>
              <TimeSincePublishing
                isBreaking={isBreaking}
                data-testId="TimeSincePublishing"
              >
                {timeSincePublishing}
              </TimeSincePublishing>
              <Divider />
            </TimeSincePublishingContainer>
          ) : null}
          <UpdatedTime
            isLessThan13Hours={!isLessThan1Minute && isLessThan13Hours}
            data-testId="UpdatedTime"
          >
            {format(updatedDate, 'h.mmaaa')}
          </UpdatedTime>
        </UpdatedTimeItems>
        {isDaysAgo ? (
          <UpdatedDate data-testid="UpdatedDate">
            {format(updatedDate, 'MMMM d yyyy')}
          </UpdatedDate>
        ) : null}
      </UpdatesContainer>
      {headline && <Headline>{safeDecodeURIComponent(headline)}</Headline>}
    </Container>
  );
};

export default ArticleHeader;
