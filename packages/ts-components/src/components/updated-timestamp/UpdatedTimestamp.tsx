import React from 'react';
import { differenceInSeconds, format, formatDistanceStrict } from 'date-fns';

import { Container, TimeSinceUpdate } from './styles';

export const UpdatedTimestamp: React.FC<{
  updatedTime?: string;
}> = ({ updatedTime }) => {
  if (!updatedTime) {
    return null;
  }
  const currentDateTime = new Date();
  const updatedDate = new Date(updatedTime);
  const timeSincePublishing =
    formatDistanceStrict(updatedDate, currentDateTime, {
      roundingMethod: 'floor'
    }) + ' ago';
  const diffInSeconds = differenceInSeconds(currentDateTime, updatedDate);

  const isLessThan1Minute = diffInSeconds < 60;
  const isLessThan13Hours = diffInSeconds < 60 * 60 * 13;

  return (
    <Container>
      {!isLessThan1Minute && isLessThan13Hours ? (
        <TimeSinceUpdate data-testId="MinutesHoursSinceUpdate">
          {`Updated ${timeSincePublishing}`}
        </TimeSinceUpdate>
      ) : !isLessThan13Hours ? (
        <TimeSinceUpdate data-testId="DateTimeUpdated">
          {`Updated `}
          {format(updatedDate, 'MMMM d, ')}
          {format(updatedDate, 'h.mmaaa')}
        </TimeSinceUpdate>
      ) : null}
    </Container>
  );
};
