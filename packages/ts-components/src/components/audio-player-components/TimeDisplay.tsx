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
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </StyledTimeDisplay>
    </Row>
  );
};
