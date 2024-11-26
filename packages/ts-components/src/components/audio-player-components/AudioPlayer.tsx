import React, {
  useState,
  useEffect,
  useRef,
  FC,
  forwardRef,
  useImperativeHandle
} from 'react';
import { AudioPlayerContainer } from './styles';
import { StickyAudioPlayerProps, AudioPlayerHandle } from './types';

import { CollapseIcon } from './CollapseIcon';
import { TitleScroller } from './TitleScroller';
import { SeekBar } from './SeekBar';
import { TimeDisplay } from './TimeDisplay';
import { PlaybackControls } from './PlaybackControls';
import { TabletDesktopPlayer } from './TabletDesktopPlayer';

export const AudioPlayer: FC<StickyAudioPlayerProps> = forwardRef(
  (
    {
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
      onClose
    },
    ref
  ) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(
      isPlayingProp !== undefined && isPlayingProp !== null
        ? isPlayingProp
        : autoPlay
    );
    const [isExpanded, setIsExpanded] = useState<boolean>(
      isExpandedProp !== undefined && isExpandedProp !== null
        ? isExpandedProp
        : true
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

    useImperativeHandle(
      ref,
      (): AudioPlayerHandle => ({
        parentControlToggle: (): void => {
          togglePlayPause();
        }
      })
    );

    useEffect(
      () => {
        if (audioRef.current) {
          audioRef.current.volume = volume;
          audioRef.current.playbackRate = speed;
        }
      },
      [volume, speed]
    );

    useEffect(
      () => {
        if (typeof isPlayingProp === 'boolean') {
          if (isPlayingProp && audioRef.current) {
            audioRef.current
              .play()
              .then(() => {
                setIsPlaying(true);
              })
              .catch(() => {
                throw Error('Error attempting to play:');
              });
          } else if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      [isPlayingProp]
    );

    useEffect(
      () => {
        if (typeof isExpandedProp === 'boolean') {
          setIsExpanded(isExpandedProp);
        }
      },
      [isExpandedProp]
    );

    const togglePlayPause = () => {
      if (!allowTogglePlay) {
        return;
      }
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            if (onPlay) {
              onPlay();
            }
          })
          .catch(() => {
            throw Error('Error attempting to play:');
          });
      } else if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
        if (onPause) {
          onPause();
        }
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
        audioRef.current &&
        audioRef.current.currentTime !== undefined &&
        audioRef.current.currentTime !== null
          ? audioRef.current.currentTime
          : 0;
      setCurrentTime(newTime);
      if (onTimeUpdate) {
        onTimeUpdate(newTime);
      }
    };

    const handleLoadedMetadata = () => {
      const loadedDuration =
        audioRef.current &&
        audioRef.current.duration !== undefined &&
        audioRef.current.duration !== null
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
        if (onSeek) {
          onSeek(clampedTime);
        }
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
      if (onVolumeChange) {
        onVolumeChange(newVolume);
      }
    };

    const handleSpeedChange = (rate: number) => {
      if (!allowPlaybackRateChange) {
        return;
      }
      setSpeed(rate);
      if (audioRef.current) {
        audioRef.current.playbackRate = rate;
      }
      if (onPlaybackRateChange) {
        onPlaybackRateChange(rate);
      }
    };

    const speedOptions = [0.5, 0.8, 1.0, 1.2, 1.5, 2];

    const handleSpeedSelect = (selectedSpeed: number) => {
      handleSpeedChange(selectedSpeed);
      setIsSpeedModalOpen(false);
    };

    return (
      <>
        <audio
          ref={audioRef}
          src={src}
          autoPlay={autoPlay}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={onEnded}
        />

        {isMobile ? (
          <AudioPlayerContainer
            isExpanded={isExpanded}
            isModalOpen={isSpeedModalOpen}
          >
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
        ) : (
          <TabletDesktopPlayer
            audioRef={audioRef}
            isPlaying={isPlaying}
            togglePlayPause={togglePlayPause}
            currentTime={currentTime}
            duration={duration}
            allowTogglePlay={allowTogglePlay}
            allowSeek={allowSeek}
            allowVolumeChange={allowVolumeChange}
            volume={volume}
            setVolume={handleVolumeChange}
            handleSeek={handleSeek}
            handleVolumeChange={handleVolumeChange}
            speed={speed}
            handleSpeedChange={handleSpeedChange}
            allowPlaybackRateChange={allowPlaybackRateChange}
            isSpeedModalOpen={isSpeedModalOpen}
            setIsSpeedModalOpen={setIsSpeedModalOpen}
            speedOptions={speedOptions}
            handleSpeedSelect={handleSpeedSelect}
            isVolumeSliderVisible={isVolumeSliderVisible}
            setIsVolumeSliderVisible={setIsVolumeSliderVisible}
            onClose={onClose}
            allowExpandCollapse={allowExpandCollapse}
            isMobile={isMobile}
          />
        )}
      </>
    );
  }
);
