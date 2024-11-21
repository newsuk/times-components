import React from 'react';
import { storiesOf } from '@storybook/react';
import { AudioPlayer } from './AudioPlayer';
import { withKnobs, boolean, number, text } from '@storybook/addon-knobs';

storiesOf('Typescript Component/Audio Player', module)
  .addDecorator(withKnobs) // Allows dynamic prop changes via knobs
  .addParameters({
    component: AudioPlayer,
    docs: {
      description: {
        component: `

A customizable audio player component with various controls.

## Props

### \`src\` (Required)

- **Type**: \`string\`
- **Description**: The URL of the audio source file to be played.

### \`title\`

- **Type**: \`string\`
- **Default**: \`'Audio Title'\`
- **Description**: The title of the audio track displayed in the player.

### \`autoPlay\`

- **Type**: \`boolean\`
- **Default**: \`false\`
- **Description**: Determines whether the audio should start playing automatically when the component mounts.

### \`initialVolume\`

- **Type**: \`number\` (Range between \`0\` and \`1\`)
- **Default**: \`1\`
- **Description**: Sets the initial volume level of the audio player.

### \`playbackRate\`

- **Type**: \`number\`
- **Default**: \`1\`
- **Description**: Sets the initial playback speed of the audio.

### \`isPlayingProp\`

- **Type**: \`boolean\`
- **Description**: Controls the play/pause state externally. When provided, it overrides the internal state.

### \`isExpandedProp\`

- **Type**: \`boolean\`
- **Description**: Controls the expanded/collapsed state externally. When provided, it overrides the internal state.

### \`allowTogglePlay\`

- **Type**: \`boolean\`
- **Default**: \`true\`
- **Description**: Enables or disables the play/pause functionality.

### \`allowSeek\`

- **Type**: \`boolean\`
- **Default**: \`true\`
- **Description**: Enables or disables the ability to seek through the audio track.

### \`allowVolumeChange\`

- **Type**: \`boolean\`
- **Default**: \`true\`
- **Description**: Enables or disables the volume control. Volume control is available on tablet and desktop views.

### \`allowPlaybackRateChange\`

- **Type**: \`boolean\`
- **Default**: \`true\`
- **Description**: Enables or disables the ability to change the playback speed.

### \`allowExpandCollapse\`

- **Type**: \`boolean\`
- **Default**: \`true\`
- **Description**: Enables or disables the ability to expand or collapse the audio player interface.

### \`onPlay\`

- **Type**: \`() => void\`
- **Description**: Callback function invoked when the audio starts playing.

### \`onPause\`

- **Type**: \`() => void\`
- **Description**: Callback function invoked when the audio is paused.

### \`onEnded\`

- **Type**: \`() => void\`
- **Description**: Callback function invoked when the audio playback ends.

### \`onTimeUpdate\`

- **Type**: \`(currentTime: number) => void\`
- **Description**: Callback function invoked when the current playback time updates.

### \`onVolumeChange\`

- **Type**: \`(volume: number) => void\`
- **Description**: Callback function invoked when the volume level changes.

### \`onPlaybackRateChange\`

- **Type**: \`(rate: number) => void\`
- **Description**: Callback function invoked when the playback rate changes.

### \`onSeek\`

- **Type**: \`(time: number) => void\`
- **Description**: Callback function invoked when the playback position changes due to seeking.

### \`onClose\`

- **Type**: \`() => void\`
- **Description**: Callback function invoked when the audio player is closed.

## Usage Examples

### Basic Usage


\`\`\`jsx
<AudioPlayer src="https://example.com/audio-file.mp3" />
\`\`\`

### With Custom Title and AutoPlay

\`\`\`jsx
<AudioPlayer
  src="https://example.com/audio-file.mp3"
  title="Episode 1: The Beginning"
  autoPlay={true}
/>
\`\`\`

### Handling Events

\`\`\`jsx
<AudioPlayer
  src="https://example.com/audio-file.mp3"
  onPlay={() => console.log('Playing')}
  onPause={() => console.log('Paused')}
  onEnded={() => console.log('Ended')}
  onTimeUpdate={(currentTime) => console.log('Current Time:', currentTime)}
  onVolumeChange={(volume) => console.log('Volume:', volume)}
  onPlaybackRateChange={(rate) => console.log('Playback Rate:', rate)}
  onSeek={(time) => console.log('Seeked to:', time)}
  onClose={() => console.log('Player Closed')}
/>
\`\`\`

`,
      },
    },
  })
  .add('Default Audio Player', () => {
    // Use knobs to allow dynamic prop changes in Storybook
    const src = text('src', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    const title = text('title', 'Sample Audio Title for Testing');
    const autoPlay = boolean('autoPlay', false);
    const initialVolume = number('initialVolume', 0.5, { range: true, min: 0, max: 1, step: 0.1 });
    const playbackRate = number('playbackRate', 1, { range: true, min: 0.5, max: 2, step: 0.1 });
    const isPlayingProp = boolean('isPlayingProp', false);
    const isExpandedProp = boolean('isExpandedProp', true);
    const allowTogglePlay = boolean('allowTogglePlay', true);
    const allowSeek = boolean('allowSeek', true);
    const allowVolumeChange = boolean('allowVolumeChange', true);
    const allowPlaybackRateChange = boolean('allowPlaybackRateChange', true);
    const allowExpandCollapse = boolean('allowExpandCollapse', true);

    const mockProps = {
      src,
      title,
      autoPlay,
      initialVolume,
      playbackRate,
      isPlayingProp,
      isExpandedProp,
      allowTogglePlay,
      allowSeek,
      allowVolumeChange,
      allowPlaybackRateChange,
      allowExpandCollapse
    };

    return <AudioPlayer {...mockProps} />;
  });
