import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ArticleAudio } from '../ArticleAudio';

jest.mock('../styles', () => ({
  AudioButton: ({ children, onClick, style }: any) => (
    <button data-testid="audio-button" onClick={onClick} style={style}>
      {children}
    </button>
  )
}));

jest.mock('../assets/PlayIcon', () => ({
  __esModule: true,
  default: ({ color }: any) => (
    <svg data-testid="play-icon" style={{ color: color || '#333' }} />
  )
}));

jest.mock('../assets/PauseIcon', () => ({
  __esModule: true,
  default: () => <svg data-testid="pause-icon" />
}));

jest.mock('../../audio-player-components/AudioPlayer', () => ({
  AudioPlayer: ({
    src,
    isPlayingProp,
    onPlay,
    onPause,
    onEnded,
    onClose,
    onTimeUpdate,
    onVolumeChange,
    onPlaybackRateChange,
    onSeek
  }: any) => (
    <div data-testid="audio-player">
      <button onClick={onPlay}>Play</button>
      <button onClick={onPause}>Pause</button>
      <button onClick={onEnded}>Ended</button>
      <button onClick={onClose}>Close</button>
      <button onClick={() => onTimeUpdate(10)}>Time Update</button>
      <button onClick={() => onVolumeChange(0.5)}>Volume Change</button>
      <button onClick={() => onPlaybackRateChange(1.5)}>
        Playback Rate Change
      </button>
      <button onClick={() => onSeek(20)}>Seek</button>
    </div>
  )
}));

describe('ArticleAudio', () => {
  beforeEach(() => {
    // Mock the duration of the audio element
    Object.defineProperty(HTMLMediaElement.prototype, 'duration', {
      get(): number {
        return 120; // 2 minutes
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders audio button with correct initial state', () => {
    const { getByTestId, getByText, container } = render(
      <ArticleAudio audioSrc="test.mp3" />
    );

    // Trigger the 'loadedmetadata' event to set the duration
    const audio = container.querySelector('audio') as HTMLAudioElement;
    act(() => {
      fireEvent.loadedMetadata(audio);
    });

    const audioButton = getByTestId('audio-button');
    expect(audioButton).toBeInTheDocument();

    // Instead of checking the exact background color, check if the style contains 'unset' or is not set
    // Alternatively, you can check for the absence of the 'background-color' style
    expect(audioButton.style.backgroundColor).toBe(''); // Default value if not set
    expect(audioButton).toHaveStyle('color: #333');

    // The initial state should display 'Listen' and the duration
    expect(getByText('Listen')).toBeInTheDocument();
    expect(getByText('3 min')).toBeInTheDocument();

    // Since audioState is 'not-started', duration color should be '#696969'
    const durationSpan = getByText('3 min');
    expect(durationSpan).toHaveStyle('color: #696969');
  });

  test('handles play and pause', () => {
    const { getByTestId, getByText, container } = render(
      <ArticleAudio audioSrc="test.mp3" />
    );

    // Trigger the 'loadedmetadata' event to set the duration
    const audio = container.querySelector('audio') as HTMLAudioElement;
    act(() => {
      fireEvent.loadedMetadata(audio);
    });

    const audioButton = getByTestId('audio-button');

    // Simulate clicking the play button
    fireEvent.click(audioButton);

    // Now, audioState should be 'playing'
    expect(audioButton).toHaveStyle('background-color: #1D1D1B');
    expect(audioButton).toHaveStyle('color: #fff');
    expect(getByText('Playing')).toBeInTheDocument();

    // Since audioState is 'playing', duration color should be '#fff'
    const durationSpan = getByText('3 min');
    expect(durationSpan).toHaveStyle('color: #fff');

    // Simulate clicking the pause button
    fireEvent.click(audioButton);

    expect(getByText('Paused')).toBeInTheDocument();
    expect(audioButton).toHaveStyle('background-color: #1D1D1B');
    expect(audioButton).toHaveStyle('color: #fff');

    // Simulate clicking the play button again
    fireEvent.click(audioButton);

    expect(getByText('Playing')).toBeInTheDocument();
  });

  test('handles loaded metadata and updates duration', () => {
    const { getByText, container } = render(
      <ArticleAudio audioSrc="test.mp3" />
    );

    const audio = container.querySelector('audio') as HTMLAudioElement;

    act(() => {
      fireEvent.loadedMetadata(audio);
    });

    expect(getByText('3 min')).toBeInTheDocument();
  });

  test('shows AudioPlayer when audio is played', () => {
    const { getByTestId, queryByTestId, container } = render(
      <ArticleAudio audioSrc="test.mp3" />
    );

    // Trigger the 'loadedmetadata' event to set the duration
    const audio = container.querySelector('audio') as HTMLAudioElement;
    act(() => {
      fireEvent.loadedMetadata(audio);
    });

    expect(queryByTestId('audio-player')).not.toBeInTheDocument();

    const audioButton = getByTestId('audio-button');
    fireEvent.click(audioButton);

    expect(getByTestId('audio-player')).toBeInTheDocument();
  });

  test('updates audioState based on AudioPlayer callbacks', () => {
    const { getByTestId, getByText, container } = render(
      <ArticleAudio audioSrc="test.mp3" />
    );

    // Trigger the 'loadedmetadata' event to set the duration
    const audio = container.querySelector('audio') as HTMLAudioElement;
    act(() => {
      fireEvent.loadedMetadata(audio);
    });

    const audioButton = getByTestId('audio-button');
    fireEvent.click(audioButton); // Start playing

    expect(getByText('Playing')).toBeInTheDocument();

    const pauseButton = getByText('Pause');
    fireEvent.click(pauseButton);

    expect(getByText('Paused')).toBeInTheDocument();

    const playButton = getByText('Play');
    fireEvent.click(playButton);

    expect(getByText('Playing')).toBeInTheDocument();

    const endedButton = getByText('Ended');
    fireEvent.click(endedButton);

    expect(getByText('Listen')).toBeInTheDocument();
  });

  test('handles AudioPlayer callbacks', () => {
    const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();

    const { getByTestId, getByText, container } = render(
      <ArticleAudio audioSrc="test.mp3" />
    );

    // Trigger the 'loadedmetadata' event to set the duration
    const audio = container.querySelector('audio') as HTMLAudioElement;
    act(() => {
      fireEvent.loadedMetadata(audio);
    });

    const audioButton = getByTestId('audio-button');
    fireEvent.click(audioButton);

    const timeUpdateButton = getByText('Time Update');
    fireEvent.click(timeUpdateButton);
    expect(consoleLogMock).toHaveBeenCalledWith('Current Time:', 10);

    const volumeChangeButton = getByText('Volume Change');
    fireEvent.click(volumeChangeButton);
    expect(consoleLogMock).toHaveBeenCalledWith('Volume:', 0.5);

    const playbackRateChangeButton = getByText('Playback Rate Change');
    fireEvent.click(playbackRateChangeButton);
    expect(consoleLogMock).toHaveBeenCalledWith('Playback Rate:', 1.5);

    const seekButton = getByText('Seek');
    fireEvent.click(seekButton);
    expect(consoleLogMock).toHaveBeenCalledWith('Seeked to:', 20);

    const closeButton = getByText('Close');
    fireEvent.click(closeButton);
    expect(consoleLogMock).toHaveBeenCalledWith('Player Closed');

    consoleLogMock.mockRestore();
  });
});
