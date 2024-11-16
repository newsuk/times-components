// AudioPlayer.stories.tsx

import React from 'react';
import { storiesOf } from '@storybook/react';
import { AudioPlayer } from './AudioPlayer';

storiesOf('Typescript Component/Audio Player', module).add(
  'Default Audio Player',
  () => {
    const mockProps = {
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      title: 'Sample Audio Title for Testing',
      autoPlay: false,
      initialVolume: 0.5,
      playbackRate: 1,
      isPlayingProp: false,
      isExpandedProp: true,
      allowTogglePlay: true,
      allowSeek: true,
      allowVolumeChange: true,
      allowPlaybackRateChange: true,
      allowExpandCollapse: true,
      onPlay: () => console.log('Audio is playing'),
      onPause: () => console.log('Audio is paused'),
      onEnded: () => console.log('Audio playback ended'),
      onTimeUpdate: (currentTime: number) =>
        console.log('Current time updated:', currentTime),
      onVolumeChange: (volume: number) =>
        console.log('Volume changed:', volume),
      onPlaybackRateChange: (rate: number) =>
        console.log('Playback rate changed:', rate),
      onSeek: (time: number) => console.log('Seek to time:', time),
      onClose: () => console.log('Player closed'),
    };

    return <AudioPlayer {...mockProps} />;
  }
);
