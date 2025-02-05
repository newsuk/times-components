import React, { FC } from 'react';
import {
  Row,
  Controls,
  ControlButton,
  SpeedSelectModal,
  SpeedOptionItem,
  CloseButton,
  PlaybackButtonsContainer,
  SpeedButton,
  PlayPauseButton,
  SpeedOptionsContainer,
} from './styles';
import {
  PlayIcon,
  PauseIcon,
  IconCheck,
  PlayerBack,
  PlayerFront,
} from '@times-components/icons';
import { PlaybackControlsProps } from './types';

export const PlaybackControls: FC<PlaybackControlsProps> = ({
  isPlaying,
  togglePlayPause,
  rewind,
  forward,
  speed,
  onSpeedChange,
  allowTogglePlay,
  allowSeek,
  allowPlaybackRateChange,
  isSpeedModalOpen,
  setIsSpeedModalOpen,
  isMobile,
}) => {
  const toggleSpeedModal = () => {
    if (allowPlaybackRateChange) {
      setIsSpeedModalOpen(!isSpeedModalOpen);
    }
  };

  const handleSpeedSelect = (selectedSpeed: number) => {
    onSpeedChange(selectedSpeed);
    setIsSpeedModalOpen(false);
  };

  const speedOptions = [0.5, 0.8, 1.0, 1.2, 1.5, 2];

  return (
    <Row>
      <Controls>
        <PlaybackButtonsContainer>
          <ControlButton
            onClick={rewind}
            disabled={!allowSeek}
            aria-label="Rewind 10 seconds"
          >
            <PlayerBack />
          </ControlButton>
          <PlayPauseButton
            onClick={togglePlayPause}
            disabled={!allowTogglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <PauseIcon fill="white" /> : <PlayIcon fill="white" />}
          </PlayPauseButton>
          <ControlButton
            onClick={forward}
            disabled={!allowSeek}
            aria-label="Forward 10 seconds"
          >
            <PlayerFront />
          </ControlButton>
        </PlaybackButtonsContainer>
        <SpeedButton
          onClick={toggleSpeedModal}
          aria-label="Change Playback Speed"
        >
          Speed
        </SpeedButton>
      </Controls>
      {isSpeedModalOpen && (
        <SpeedSelectModal isMobile={isMobile}>
          <SpeedOptionsContainer>
            {speedOptions.map((option) => (
              <SpeedOptionItem
                key={option}
                selected={option === speed}
                onClick={() => handleSpeedSelect(option)}
              >
                <span>{option}x</span>
                {option === speed && <IconCheck />}
              </SpeedOptionItem>
            ))}
          </SpeedOptionsContainer>
          <CloseButton onClick={() => setIsSpeedModalOpen(false)}>
            Close
          </CloseButton>
        </SpeedSelectModal>
      )}
    </Row>
  );
};
