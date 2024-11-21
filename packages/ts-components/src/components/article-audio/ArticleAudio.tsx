import React, { FC, useRef, useState } from 'react';
import { AudioButton } from './styles';
import PlayIcon from './assets/PlayIcon'
import PauseIcon from './assets/PauseIcon';
import { AudioPlayer } from '../audio-player/AudioPlayer';
import { useEffect } from '@storybook/addons';


export interface ArticleAudioProps {
  audioSrc: string;
}

export const ArticleAudio: FC<ArticleAudioProps> = ({
audioSrc
}) => {
  const [audioState, setAudioState] = useState<'not-started' | 'playing' | 'paused'>('not-started');
  const [isAudioPlayerVisible, setisAudioPlayerVisible] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  

  const [duration, setDuration] = useState<string | null>(null);

  const audioPlayerRef = useRef<{ parentControlToggle: () => void } | null>(null);


  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const totalSeconds = Math.floor(audioRef.current.duration);
      const minutes = Math.floor(totalSeconds / 60) + 1;
      
      setDuration(`${minutes}`);
    }
  };

  const handlePlayPause = () => {
    setisAudioPlayerVisible(true);

  };

  useEffect(() => {
    if(isAudioPlayerVisible){
      
    audioPlayerRef.current?.parentControlToggle();

    if (audioRef.current) {
      if (audioState === 'playing') {
       // audioRef.current.pause();
        setAudioState('paused');
       
      } else if (audioState === 'paused') {
      //  audioRef.current.play();
        setAudioState('playing');
       
      } else if (audioState === 'not-started') {
       // audioRef.current.play();
        setAudioState('playing');
      }
    }
    }
  
  
  }, [isAudioPlayerVisible])
  

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
      { isAudioPlayerVisible &&  <AudioPlayer
          ref={audioPlayerRef} 
          
          src="https://www.kozco.com/tech/LRMonoPhase4.mp3"
          onPlay={() => console.log('Playing')}
          onPause={() => console.log('Paused')}
          onEnded={() => console.log('Ended')}
          onTimeUpdate={(currentTime) => console.log('Current Time:', currentTime)}
          onVolumeChange={(volume) => console.log('Volume:', volume)}
          onPlaybackRateChange={(rate) => console.log('Playback Rate:', rate)}
          onSeek={(time) => console.log('Seeked to:', time)}
          onClose={() => console.log('Player Closed')}
          /> }
     
    </div>
  );
};




export default ArticleAudio;
