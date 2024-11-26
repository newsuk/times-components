import React, { FC, useState, useRef } from 'react';
import { AudioButton } from './styles';
import PlayIcon from './assets/PlayIcon';
import PauseIcon from './assets/PauseIcon';
import { AudioPlayer } from '../audio-player-components/AudioPlayer';

export interface ArticleAudioProps {
  audioSrc: string;
}

export const ArticleAudio: FC<ArticleAudioProps> = ({ audioSrc }) => {
  const [audioState, setAudioState] = useState<'not-started' | 'playing' | 'paused'>('not-started');
  const [isAudioPlayerVisible, setisAudioPlayerVisible] = useState<boolean>(false);
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

  return (
    <div>
      <audio ref={audioRef} src={audioSrc} onLoadedMetadata={handleLoadedMetadata} preload="metadata"></audio>
      <AudioButton
        onClick={handlePlayPause}
        style={{
          backgroundColor: audioState !== 'not-started' ? '#1D1D1B' : 'unset',
          color: audioState === 'not-started' ? '#333' : '#fff',
        }}
      >
        {audioState === 'playing' ? (
          <>
            <PauseIcon /> Playing
          </>
        ) : audioState === 'paused' ? (
          <>
            <PlayIcon color="#fff" /> Paused
          </>
        ) : (
          <>
            <PlayIcon /> Listen
          </>
        )}
        <span
          style={{
            color: audioState === 'not-started' ? '#696969' : '#fff',
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
          onTimeUpdate={(currentTime) => console.log('Current Time:', currentTime)}
          onVolumeChange={(volume) => console.log('Volume:', volume)}
          onPlaybackRateChange={(rate) => console.log('Playback Rate:', rate)}
          onSeek={(time) => console.log('Seeked to:', time)}
          onClose={() => console.log('Player Closed')}
        />
      )}
    </div>
  );
};

export default ArticleAudio;
