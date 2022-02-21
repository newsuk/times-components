import React from 'react';
import {
  format,
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
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
  const secondsDifference = differenceInSeconds(currentDateTime, updatedDate);
  const minutesDifference = differenceInMinutes(currentDateTime, updatedDate);
  const hoursDifference = differenceInHours(currentDateTime, updatedDate);

  const isBreaking = breaking?.toLowerCase() === 'true';
  console.log(isBreaking, 'IS BREAKING');
  console.log(breaking, 'BREAKING')
  const isLessThan13Hours = secondsDifference > 59 && hoursDifference < 13;
  const isDaysAgo = differenceInCalendarDays(currentDateTime, updatedDate) >= 1;

  return (
    <Container isBreaking={isBreaking && minutesDifference < 61}>
      <UpdatesContainer>
        <UpdatedTimeItems>
          {isBreaking && minutesDifference < 61 ? (
            <FlagContainer>
              <BreakingArticleFlag />
            </FlagContainer>
          ) : null}
          {isLessThan13Hours ? (
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
            isLessThan13Hours={isLessThan13Hours}
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
      {
        headline && <Headline>{decodeURI(headline)}</Headline>
      }
    </Container>
  );
};

export default ArticleHeader;
