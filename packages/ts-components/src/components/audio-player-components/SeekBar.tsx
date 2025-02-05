import React, { FC } from 'react';
import { Row, StyledSeekBar } from './styles';
import { SeekBarProps } from './types';

export const SeekBar: FC<SeekBarProps> = ({
  currentTime,
  duration,
  onSeek,
  allowSeek,
}) => {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <Row>
      <StyledSeekBar
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={(e) => onSeek(parseFloat(e.target.value))}
        disabled={!allowSeek}
        aria-label="Seek Bar"
        progress={progress}
      />
    </Row>
  );
};
