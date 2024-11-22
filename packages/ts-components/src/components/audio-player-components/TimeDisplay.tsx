import React, { FC } from 'react';
import { Row, StyledTimeDisplay } from './styles';
import { TimeDisplayProps } from './types';
import { formatTime } from './utils';

export const TimeDisplay: FC<TimeDisplayProps> = ({
  currentTime,
  duration
}) => {
  return (
    <Row>
      <StyledTimeDisplay>
        <span data-testid="current-time">{formatTime(currentTime)}</span>
        <span data-testid="duration">{formatTime(duration)}</span>
      </StyledTimeDisplay>
    </Row>
  );
};
