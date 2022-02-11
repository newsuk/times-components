import React from 'react';
import {
  format,
  differenceInSeconds,
  differenceInHours,
  distanceInWordsStrict,
  isYesterday
} from 'date-fns';

import { BreakingArticleFlag } from '../article-flag/LiveArticleFlag';
import {
  Container,
  Divider,
  Headline,
  TimeSincePublishing,
  TimeSincePublishingContainer,
  UpdatedDate,
  UpdatedTime,
  UpdatedTimeItems,
  UpdatesContainer
} from './styles';

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
  const hoursDifference = differenceInHours(currentDateTime, updated);
  const isBreaking = Boolean(breaking);
  const isLessThan13Hours = secondsDifference > 59 && hoursDifference < 13;

  return (
    <Container>
      <UpdatesContainer>
        <UpdatedTimeItems>
          {breaking ? <BreakingArticleFlag /> : null}
          {isLessThan13Hours ? (
            <TimeSincePublishingContainer>
              <TimeSincePublishing isBreaking={isBreaking}>
                {timeSincePublishing}
              </TimeSincePublishing>
              <Divider>{'|'}</Divider>
            </TimeSincePublishingContainer>
          ) : null}
          <UpdatedTime isLessThan13Hours={isLessThan13Hours}>
            {format(updated, 'h.mma')}
          </UpdatedTime>
        </UpdatedTimeItems>
        <UpdatedDate>
          {isYesterday(updated) ? format(updated, 'MMMM D YYYY') : null}
        </UpdatedDate>
      </UpdatesContainer>
      <Headline>{decodeURI(headline)}</Headline>
    </Container>
  );
};
