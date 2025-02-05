import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ArticleAudio } from '../ArticleAudio';

jest.mock('../styles', () => ({
  AudioButton: ({ children, onClick, style }: any) => (
    <button data-testid="audio-button" onClick={onClick} style={style}>
      {children}
    </button>
  ),
}));

jest.mock('@times-components/icons', () => ({
  __esModule: true,
  PlayIcon: ({ color }: any) => (
    <svg data-testid="play-icon" style={{ color: color || '#333' }} />
  ),
  PauseIcon: ({ color }: any) => (
    <svg data-testid="pause-icon" style={{ color: color || '#333' }} />
  ),
}));

jest.mock('../../audio-player-components/AudioPlayer', () => ({
  AudioPlayer: ({ onPlay, onPause, onEnded, onClose }: any) => (
    <div data-testid="audio-player">
      <button onClick={onPlay}>Play</button>
      <button onClick={onPause}>Pause</button>
      <button onClick={onEnded}>Ended</button>
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

describe('ArticleAudio', () => {
  beforeEach(() => {
    // Mock the duration of the audio element
    Object.defineProperty(HTMLMediaElement.prototype, 'duration', {
      get(): number {
        return 120; // 2 minutes
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders audio button with correct initial state', () => {
    const { getByTestId, getByText, container } = render(
      <ArticleAudio audioSrc="https://www.kozco.com/tech/LRMonoPhase4.mp3" />
    );

    // Trigger the 'loadedmetadata' event to set the duration
    const audio = container.querySelector('audio') as HTMLAudioElement;
    act(() => {
      fireEvent.loadedMetadata(audio);
    });

    const audioButton = getByTestId('audio-button');
    expect(audioButton).toBeInTheDocument();

    expect(audioButton.style.backgroundColor).toBe('');
    expect(audioButton).toHaveStyle('color: #333');

    // The initial state should display 'Listen' and the duration
    expect(getByText('Listen')).toBeInTheDocument();
    expect(getByText('3 min')).toBeInTheDocument();

    // Since audioState is 'not-started', duration color should be '#696969'
    const durationSpan = getByText('3 min');
    expect(durationSpan).toHaveStyle('color: #696969');
  });

  test('hides AudioPlayer when close button is clicked (using mocked AudioPlayer)', () => {
    const { getByTestId, queryByTestId, container, getByText } = render(
      <ArticleAudio audioSrc="https://www.kozco.com/tech/LRMonoPhase4.mp3" />
    );

    // Trigger the 'loadedmetadata' event to set the duration
    const audio = container.querySelector('audio') as HTMLAudioElement;
    act(() => {
      fireEvent.loadedMetadata(audio);
    });

    // Initially, the AudioPlayer should not be visible
    expect(queryByTestId('audio-player')).not.toBeInTheDocument();

    // Click the audio button to start playback
    const audioButton = getByTestId('audio-button');
    fireEvent.click(audioButton);

    // The mocked AudioPlayer should now be visible
    expect(getByTestId('audio-player')).toBeInTheDocument();

    // Use the mocked Close button inside the AudioPlayer to close it
    const closeButton = getByText('Close');
    fireEvent.click(closeButton);

    // The AudioPlayer should no longer be visible
    expect(queryByTestId('audio-player')).not.toBeInTheDocument();
  });

  test('handles play and pause', () => {
    const { getByTestId, getByText, container } = render(
      <ArticleAudio audioSrc="https://www.kozco.com/tech/LRMonoPhase4.mp3" />
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

  test('shows AudioPlayer when audio is played', () => {
    const { getByTestId, queryByTestId, container } = render(
      <ArticleAudio audioSrc="https://www.kozco.com/tech/LRMonoPhase4.mp3" />
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
      <ArticleAudio audioSrc="https://www.kozco.com/tech/LRMonoPhase4.mp3" />
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
});
