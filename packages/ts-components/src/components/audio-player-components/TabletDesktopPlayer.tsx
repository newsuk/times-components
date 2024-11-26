import React, { FC } from 'react';
import {
  TabletDesktopWrapper,
  TabletDesktopInnerWrapper,
  LeftControls,
  CenterControls,
  RightControls,
  TabletDesktopPlayPauseButton,
  TabletDesktopStatusText,
  TabletDesktopVolumeControlContainer,
  TabletDesktopVolumeButton,
  TabletDesktopVolumeSlider,
  TabletDesktopTimeDisplay,
  TabletDesktopSeekBar,
  TabletDesktopSpeedButton,
  SpeedSelectModal,
  SpeedOptionItem,
  TabletDesktopCloseButton,
  SpeedButtonContainer,
  SpeedOptionsContainer
} from './styles';
import {
  PlayIcon,
  PauseIcon,
  IconVolume,
  IconCheck,
  AudioCloseIcon
} from '@times-components/icons';
import { formatTime } from './utils';
import { TabletDesktopPlayerProps } from './types';

export const TabletDesktopPlayer: FC<TabletDesktopPlayerProps> = ({
  isPlaying,
  togglePlayPause,
  currentTime,
  duration,
  allowTogglePlay,
  allowSeek,
  allowVolumeChange,
  volume,
  handleSeek,
  handleVolumeChange,
  speed,
  allowPlaybackRateChange,
  isSpeedModalOpen,
  setIsSpeedModalOpen,
  speedOptions,
  handleSpeedSelect,
  isVolumeSliderVisible,
  setIsVolumeSliderVisible,
  onClose,
  allowExpandCollapse,
  isMobile
}) => {
  return (
    <TabletDesktopWrapper>
      <TabletDesktopInnerWrapper>
        <LeftControls>
          <TabletDesktopPlayPauseButton
            onClick={togglePlayPause}
            disabled={!allowTogglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </TabletDesktopPlayPauseButton>
          <TabletDesktopStatusText>
            {isPlaying ? 'Playing' : 'Paused'}
          </TabletDesktopStatusText>
          {allowVolumeChange && (
            <TabletDesktopVolumeControlContainer>
              <TabletDesktopVolumeButton
                onClick={() => setIsVolumeSliderVisible(!isVolumeSliderVisible)}
                aria-label="Volume Control"
              >
                <IconVolume />
              </TabletDesktopVolumeButton>
              {isVolumeSliderVisible && (
                <TabletDesktopVolumeSlider
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={e => handleVolumeChange(parseFloat(e.target.value))}
                />
              )}
            </TabletDesktopVolumeControlContainer>
          )}
        </LeftControls>

        <CenterControls>
          <TabletDesktopTimeDisplay>
            <span>{formatTime(currentTime)}</span>
          </TabletDesktopTimeDisplay>

          <TabletDesktopSeekBar
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={e => handleSeek(parseFloat(e.target.value))}
            disabled={!allowSeek}
            aria-label="Seek Bar"
            progress={duration > 0 ? (currentTime / duration) * 100 : 0}
          />

          <TabletDesktopTimeDisplay>
            <span>{formatTime(duration)}</span>
          </TabletDesktopTimeDisplay>
        </CenterControls>

        <RightControls>
          {allowPlaybackRateChange && (
            <SpeedButtonContainer>
              <TabletDesktopSpeedButton
                onClick={() => {
                  if (allowPlaybackRateChange) {
                    setIsSpeedModalOpen(!isSpeedModalOpen);
                  }
                }}
                aria-label="Change Playback Speed"
              >
                Speed
              </TabletDesktopSpeedButton>

              {isSpeedModalOpen && (
                <SpeedSelectModal isMobile={isMobile}>
                  <SpeedOptionsContainer>
                    {speedOptions.map(option => (
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
                </SpeedSelectModal>
              )}
            </SpeedButtonContainer>
          )}

          {allowExpandCollapse && (
            <TabletDesktopCloseButton
              onClick={onClose}
              aria-label="Close Player"
            >
              <AudioCloseIcon fill="black" />
            </TabletDesktopCloseButton>
          )}
        </RightControls>
      </TabletDesktopInnerWrapper>
    </TabletDesktopWrapper>
  );
};
