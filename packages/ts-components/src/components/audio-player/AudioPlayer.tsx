import React, { useState, useEffect, useRef, FC } from 'react';
import {
  AudioPlayerContainer,
  Row,
  CollapseButton,
  Title,
  StyledSeekBar,
  StyledTimeDisplay,
  Controls,
  ControlButton,
  SpeedSelectModal,
  SpeedOptionItem,
  CloseButton,
  PlaybackButtonsContainer,
  SpeedButton,
  PlayPauseButton,
  SpeedOptionsContainer,
  TabletDesktopWrapper,
  TabletDesktopInnerWrapper,
  TabletDesktopPlayPauseButton,
  TabletDesktopStatusText,
  TabletDesktopVolumeControlContainer,
  TabletDesktopVolumeButton,
  TabletDesktopVolumeSlider,
  TabletDesktopTimeDisplay,
  TabletDesktopSeekBar,
  TabletDesktopSpeedButton,
  TabletDesktopCloseButton,
  LeftControls,
  CenterControls,
  RightControls,
  SpeedButtonContainer,
} from './styles';
import {
  StickyAudioPlayerProps,
  CollapseIconProps,
  TitleScrollerProps,
  SeekBarProps,
  TimeDisplayProps,
  PlaybackControlsProps,
} from './types';

import {
  IconCheck,
  PlayerModalIcon,
  PlayerBack,
  PlayerFront,
  PlayIcon,
  PauseIcon,
  IconVolume,
  AudioCloseIcon,
} from '@times-components/icons';

// Helper function to format time in mm:ss format
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

// CollapseIcon Component
const CollapseIcon: FC<CollapseIconProps> = ({
  isExpanded,
  toggleExpand,
  allowExpandCollapse,
}) => {
  if (!allowExpandCollapse) {
    return null;
  }

  return (
    <Row>
      <CollapseButton
        onClick={toggleExpand}
        aria-label={isExpanded ? 'Collapse Player' : 'Expand Player'}
      >
        <PlayerModalIcon />
      </CollapseButton>
    </Row>
  );
};

// TitleScroller Component
const TitleScroller: FC<TitleScrollerProps> = ({ title }) => {
  return (
    <Row>
      <Title>
        <div>{title}</div>
      </Title>
    </Row>
  );
};

// SeekBar Component
const SeekBar: FC<SeekBarProps> = ({
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

// TimeDisplay Component
const TimeDisplay: FC<TimeDisplayProps> = ({ currentTime, duration }) => {
  return (
    <Row>
      <StyledTimeDisplay>
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </StyledTimeDisplay>
    </Row>
  );
};

// PlaybackControls Component with Modal State Props
const PlaybackControls: FC<PlaybackControlsProps> = ({
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
          <CloseButton
            onClick={() => setIsSpeedModalOpen(false)}
          >
            Close
          </CloseButton>
        </SpeedSelectModal>
      )}
    </Row>
  );
};

// Main AudioPlayer Component with Responsive Wrapper
export const AudioPlayer: FC<StickyAudioPlayerProps> = ({
  src,
  title = 'Audio Title',
  autoPlay = false,
  initialVolume = 1,
  playbackRate = 1,
  isPlayingProp,
  isExpandedProp,
  allowTogglePlay = true,
  allowSeek = true,
  allowVolumeChange = true,
  allowPlaybackRateChange = true,
  allowExpandCollapse = true,
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  onVolumeChange,
  onPlaybackRateChange,
  onSeek,
  onClose,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(
    isPlayingProp !== undefined && isPlayingProp !== null ? isPlayingProp : autoPlay
  );
  const [isExpanded, setIsExpanded] = useState<boolean>(
    isExpandedProp !== undefined && isExpandedProp !== null ? isExpandedProp : true

  );
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(initialVolume);
  const [speed, setSpeed] = useState<number>(playbackRate);
  const [isSpeedModalOpen, setIsSpeedModalOpen] = useState<boolean>(false);
  const [isVolumeSliderVisible, setIsVolumeSliderVisible] = useState<boolean>(
    false
  );

  // State to track if the view is mobile or tablet/desktop
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth <= 520 : true
  );

  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 520);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.playbackRate = speed;
    }
  }, [volume, speed]);

  useEffect(() => {
    if (typeof isPlayingProp === 'boolean') {
      if (isPlayingProp) {
        audioRef.current
          ?.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            throw Error('Error attempting to play:');
          });
      } else {
        audioRef.current?.pause();
        setIsPlaying(false);
      }
    }
  }, [isPlayingProp]);

  useEffect(() => {
    if (typeof isExpandedProp === 'boolean') {
      setIsExpanded(isExpandedProp);
    }
  }, [isExpandedProp]);

  const togglePlayPause = () => {
    if (!allowTogglePlay) {
      return;
    }
    if (audioRef.current?.paused) {
      audioRef.current
        ?.play()
        .then(() => {
          setIsPlaying(true);
          onPlay && onPlay();
        })
        .catch(() => {
          throw Error('Error attempting to play:');
        });
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
      onPause && onPause();
    }
  };

  const toggleExpand = () => {
    if (!allowExpandCollapse) {
      return;
    }
    setIsExpanded(!isExpanded);
  };

  const handleTimeUpdate = () => {
    if (!allowSeek) {
      return;
    }
    const newTime =
      audioRef.current?.currentTime !== undefined && audioRef.current?.currentTime !== null
        ? audioRef.current.currentTime
        : 0;
    setCurrentTime(newTime);
    if (onTimeUpdate) {
      onTimeUpdate(newTime);
    }
  };
  
  const handleLoadedMetadata = () => {
    const loadedDuration =
      audioRef.current?.duration !== undefined && audioRef.current?.duration !== null
        ? audioRef.current.duration
        : 0;
    setDuration(loadedDuration);
  };

  const handleSeek = (time: number) => {
    if (!allowSeek) {
      return;
    }
    if (audioRef.current) {
      const clampedTime = Math.min(Math.max(time, 0), duration);
      audioRef.current.currentTime = clampedTime;
      setCurrentTime(clampedTime);
      onSeek && onSeek(clampedTime);
    }
  };
  

  const handleRewind = () => {
    handleSeek(currentTime - 10);
  };

  const handleForward = () => {
    handleSeek(currentTime + 10);
  };

  const handleVolumeChange = (newVolume: number) => {
    if (!allowVolumeChange) {
      return;
    }
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    onVolumeChange && onVolumeChange(newVolume);
  };

  const handleSpeedChange = (rate: number) => {
    if (!allowPlaybackRateChange) {
      return;
    }
    setSpeed(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
    onPlaybackRateChange && onPlaybackRateChange(rate);
  };

  const speedOptions = [0.5, 0.8, 1.0, 1.2, 1.5, 2];

  const toggleSpeedModal = () => {
    if (allowPlaybackRateChange) {
      setIsSpeedModalOpen(!isSpeedModalOpen);
    }
  };

  const handleSpeedSelect = (selectedSpeed: number) => {
    handleSpeedChange(selectedSpeed);
    setIsSpeedModalOpen(false);
  };

  // If not mobile, render the tablet/desktop player
  if (!isMobile) {
    return (
      <TabletDesktopWrapper>
        <TabletDesktopInnerWrapper>
          <audio
            ref={audioRef}
            src={src}
            autoPlay={autoPlay}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={onEnded}
          />
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
                  onClick={() =>
                    setIsVolumeSliderVisible(!isVolumeSliderVisible)
                  }
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
                    onChange={(e) =>
                      handleVolumeChange(parseFloat(e.target.value))
                    }
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
              onChange={(e) => handleSeek(parseFloat(e.target.value))}
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
                  onClick={toggleSpeedModal}
                  aria-label="Change Playback Speed"
                >
                  Speed
                </TabletDesktopSpeedButton>

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
  }

  // Else, render the mobile AudioPlayer
  return (
    <AudioPlayerContainer
      isExpanded={isExpanded}
      isModalOpen={isSpeedModalOpen}
    >
      <audio
        ref={audioRef}
        src={src}
        autoPlay={autoPlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={onEnded}
      />

      <CollapseIcon
        isExpanded={isExpanded}
        toggleExpand={toggleExpand}
        allowExpandCollapse={allowExpandCollapse}
      />

      {isExpanded && (
        <>
          <TitleScroller title={title} />
          <SeekBar
            currentTime={currentTime}
            duration={duration}
            onSeek={handleSeek}
            allowSeek={allowSeek}
          />
          <TimeDisplay currentTime={currentTime} duration={duration} />
          <PlaybackControls
            isPlaying={isPlaying}
            togglePlayPause={togglePlayPause}
            rewind={handleRewind}
            forward={handleForward}
            speed={speed}
            onSpeedChange={handleSpeedChange}
            allowTogglePlay={allowTogglePlay}
            allowSeek={allowSeek}
            allowPlaybackRateChange={allowPlaybackRateChange}
            isSpeedModalOpen={isSpeedModalOpen}
            setIsSpeedModalOpen={setIsSpeedModalOpen}
            isMobile={isMobile}
          />
        </>
      )}
    </AudioPlayerContainer>
  );
};
