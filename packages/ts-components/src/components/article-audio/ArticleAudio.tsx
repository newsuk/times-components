import React, { FC, useRef, useState } from 'react';
import { AudioButton } from './styles';
import PlayIcon from './assets/PlayIcon'
import PauseIcon from './assets/PauseIcon';



export interface ArticleAudioProps {
  audioSrc: string;
}

export const ArticleAudio: FC<ArticleAudioProps> = ({
audioSrc
}) => {
  const [audioState, setAudioState] = useState<'not-started' | 'playing' | 'paused'>('not-started');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [duration, setDuration] = useState<string | null>(null);

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const totalSeconds = Math.floor(audioRef.current.duration);
      const minutes = Math.floor(totalSeconds / 60) + 1;
      
      setDuration(`${minutes}`);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (audioState === 'playing') {
        audioRef.current.pause();
        setAudioState('paused');
      } else if (audioState === 'paused') {
        audioRef.current.play();
        setAudioState('playing');
      } else if (audioState === 'not-started') {
        audioRef.current.play();
        setAudioState('playing');
      }
    }
  };

  return (
    <div>
      <audio ref={audioRef} src={audioSrc} onLoadedMetadata={handleLoadedMetadata}
        preload="metadata"></audio>
      <AudioButton
        onClick={handlePlayPause}
        style={{
        
          backgroundColor:
            audioState === 'playing'
              ? '#1D1D1B' 
              : audioState === 'paused'
              ? '#1D1D1B' 
              : 'unset',
          color: audioState === 'not-started' ? '#333' : '#fff',
        }}
      
      >    
        {audioState === 'playing' ? ( <> <PauseIcon /> Playing</>) : audioState === 'paused' ? (<><PlayIcon color="#fff" />Paused</>) : (<><PlayIcon />Listen</>)}
        <span  style={{
        color: audioState === 'not-started' ? '#696969' : '#fff',
      }}> {duration}min</span>
      </AudioButton>
      
    </div>
  );
};




export default ArticleAudio;
