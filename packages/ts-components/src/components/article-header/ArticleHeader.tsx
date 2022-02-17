import React from 'react';
import {
  format,
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInCalendarDays
} from 'date-fns';
import formatDistanceStrict from "date-fns/formatDistanceStrict"

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
  breaking: boolean;
  headline: string;
}> = ({ updated, breaking, headline }) => {
  const updatedDate = new Date(updated);
  const currentDateTime = new Date();
  const timeSincePublishing =
    formatDistanceStrict(updatedDate, currentDateTime, {
      roundingMethod: 'floor'
    }) + ' ago';
  const secondsDifference = differenceInSeconds(currentDateTime, updatedDate);
  const minutesDifference = differenceInMinutes(currentDateTime, updatedDate);
  const hoursDifference = differenceInHours(currentDateTime, updatedDate);

  const isBreaking = Boolean(breaking);
  const isLessThan13Hours = secondsDifference > 59 && hoursDifference < 13;
  const isDaysAgo = differenceInCalendarDays(currentDateTime, updatedDate) >= 1;

  return (
    <Container isBreaking={isBreaking && minutesDifference < 61}>
      <UpdatesContainer>
        <UpdatedTimeItems>
          {breaking && minutesDifference < 61 ? (
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
      <Headline>{decodeURI(headline)}</Headline>
    </Container>
  );
};

export default ArticleHeader;
