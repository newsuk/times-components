import React, { FC, useState, useRef } from 'react';
import { AudioButton } from './styles';
import { AudioPlayer } from '../audio-player-components/AudioPlayer';
import { PlayIcon, PauseIcon } from '@times-components/icons';
export interface ArticleAudioProps {
  audioSrc: string;
}

export const ArticleAudio: FC<ArticleAudioProps> = ({ audioSrc }) => {
  const [audioState, setAudioState] = useState<
    'not-started' | 'playing' | 'paused'
  >('not-started');
  const [isAudioPlayerVisible, setisAudioPlayerVisible] = useState<boolean>(
    false
  );
  const [duration, setDuration] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const totalSeconds = Math.floor(audioRef.current.duration);
      const minutes = Math.floor(totalSeconds / 60) + 1;
      setDuration(`${minutes}`);
    }
  };

  const handlePlayPause = () => {
    setisAudioPlayerVisible(true);

    if (audioState === 'playing') {
      setAudioState('paused');
    } else {
      setAudioState('playing');
    }
  };

  const hidePlayer = () => {
    setisAudioPlayerVisible(false);
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src={audioSrc}
        onLoadedMetadata={handleLoadedMetadata}
        preload="metadata"
      />
      <AudioButton
        onClick={handlePlayPause}
        style={{
          backgroundColor: audioState !== 'not-started' ? '#1D1D1B' : 'unset',
          color: audioState === 'not-started' ? '#333' : '#fff'
        }}
      >
        {audioState === 'playing' ? (
          <>
            <PauseIcon width={16} height={16} fill="#fff" /> Playing
          </>
        ) : audioState === 'paused' ? (
          <>
            <PlayIcon width={16} height={16} fill="#fff" /> Paused
          </>
        ) : (
          <>
            <PlayIcon width={16} height={16} /> Listen
          </>
        )}
        <span
          style={{
            color: audioState === 'not-started' ? '#696969' : '#fff'
          }}
        >
          {' '}
          {duration} min
        </span>
      </AudioButton>
      {isAudioPlayerVisible && (
        <AudioPlayer
          src={audioSrc}
          isPlayingProp={audioState === 'playing'}
          onPlay={() => setAudioState('playing')}
          onPause={() => setAudioState('paused')}
          onEnded={() => setAudioState('not-started')}
          onClose={() => hidePlayer()}
        />
      )}
    </div>
  );
};

export default ArticleAudio;
