import React from 'react';
import {
  format,
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  distanceInWordsStrict,
  isYesterday
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

export const ArticleHeader: React.FC<{
  updated: string;
  breaking: boolean;
  headline: string;
}> = ({ updated, breaking, headline }) => {
  const currentDateTime = new Date();
  const timeSincePublishing =
    distanceInWordsStrict(updated, currentDateTime, {
      partialMethod: 'floor'
    }) + ' ago';
  const secondsDifference = differenceInSeconds(currentDateTime, updated);
  const minutesDifference = differenceInMinutes(currentDateTime, updated);
  const hoursDifference = differenceInHours(currentDateTime, updated);

  const isBreaking = Boolean(breaking);
  const isLessThan13Hours = secondsDifference > 59 && hoursDifference < 13;

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
            {format(updated, 'h.mma')}
          </UpdatedTime>
        </UpdatedTimeItems>
        {isYesterday(updated) ? (
          <UpdatedDate data-testid="UpdatedDate">
            {format(updated, 'MMMM D YYYY')}
          </UpdatedDate>
        ) : null}
      </UpdatesContainer>
      <Headline>{decodeURI(headline)}</Headline>
    </Container>
  );
};
