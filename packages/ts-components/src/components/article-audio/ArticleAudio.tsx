import React, { FC, useState, useRef } from 'react';
import { AudioButton, AudioDuration } from './styles';
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
      setisAudioPlayerVisible(false);
    } else {
      setAudioState('playing');
    }
  };

  const hidePlayer = () => {
    setisAudioPlayerVisible(false);
    setAudioState('not-started');
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
        className='article-audio-button'
        style={{
          backgroundColor: audioState !== 'not-started' ? '#1D1D1B' : "#fff",
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
        <AudioDuration
          style={{
            color: audioState === 'not-started' ? '#696969' : '#fff'
          }}
        >
          {' '}
          {duration} min
        </AudioDuration>
      </AudioButton>
        <div data-testid="audioPlayerWrapper" style={{
       
        display: !isAudioPlayerVisible ? 'none' : 'block'
      }}>
        <AudioPlayer
          src={audioSrc}
          isPlayingProp={audioState === 'playing'}
          onPlay={() => setAudioState('playing')}
          onPause={() => setAudioState('paused')}
          onEnded={() => hidePlayer()}
          onClose={() => hidePlayer()}
        />
        </div>
    
    </div>
  );
};

export default ArticleAudio;
