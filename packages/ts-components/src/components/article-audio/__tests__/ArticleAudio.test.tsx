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
  AudioDuration: ({ children, style }: any) => (
    <span data-testid="audio-duration" style={style}>
      {children}
    </span>
  )
}));

jest.mock('@times-components/icons', () => ({
  __esModule: true,
  PlayIcon: ({ fill }: any) => (
    <svg data-testid="play-icon" style={{ fill: fill || '#333' }} />
  ),
  PauseIcon: ({ fill }: any) => (
    <svg data-testid="pause-icon" style={{ fill: fill || '#333' }} />
  )
}));

jest.mock('../../audio-player-components/AudioPlayer', () => ({
  AudioPlayer: ({ onPlay, onPause, onEnded, onClose }: any) => (
    <div data-testid="audio-player">
      <button onClick={onPlay}>Play</button>
      <button onClick={onPause}>Pause</button>
      <button onClick={onEnded}>Ended</button>
      <button onClick={onClose}>Close</button>
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
      <ArticleAudio audioSrc="https://www.kozco.com/tech/LRMonoPhase4.mp3" />
    );

    // Trigger the 'loadedmetadata' event to set the duration
    const audio = container.querySelector('audio') as HTMLAudioElement;
    act(() => {
      fireEvent.loadedMetadata(audio);
    });

    const audioButton = getByTestId('audio-button');
    expect(audioButton).toBeInTheDocument();

    expect(audioButton).toHaveStyle('color: #333');
    expect(audioButton).toHaveStyle('background-color: #fff');

    // The initial state should display 'Listen' and the duration
    expect(getByText('Listen')).toBeInTheDocument();
    expect(getByText('3 min')).toBeInTheDocument();

    // Verify duration color when 'not-started'
    const durationSpan = getByTestId('audio-duration');
    expect(durationSpan).toHaveStyle('color: #696969');
  });

  test('handles AudioPlayer visibility toggling', () => {
    const { getByTestId, queryByTestId, container } = render(
      <ArticleAudio audioSrc="https://www.kozco.com/tech/LRMonoPhase4.mp3" />
    );

    const audio = container.querySelector('audio') as HTMLAudioElement;
    act(() => {
      fireEvent.loadedMetadata(audio);
    });

    const audioPlayer = queryByTestId('audioPlayerWrapper');

    // Verify the player is hidden initially
    expect(audioPlayer).toBeInTheDocument();
    //    expect(audioPlayer).toHaveStyle('opacity: 0');
    expect(audioPlayer).toHaveStyle('display: none');

    // Click to show the player
    const audioButton = getByTestId('audio-button');
    fireEvent.click(audioButton);

    // Verify the player is now visible
    // expect(audioPlayer).toHaveStyle('opacity: 1');
    expect(audioPlayer).toHaveStyle('visibility: visible');
  });

  test('handles play and pause state transitions correctly', () => {
    const { getByTestId, getByText, container } = render(
      <ArticleAudio audioSrc="https://www.kozco.com/tech/LRMonoPhase4.mp3" />
    );

    // Trigger the 'loadedmetadata' event
    const audio = container.querySelector('audio') as HTMLAudioElement;
    act(() => {
      fireEvent.loadedMetadata(audio);
    });

    const audioButton = getByTestId('audio-button');

    // Click to play
    fireEvent.click(audioButton);
    expect(getByText('Playing')).toBeInTheDocument();
    expect(audioButton).toHaveStyle('background-color: #1D1D1B');
    expect(audioButton).toHaveStyle('color: #fff');

    // Duration color should change to white
    const durationSpan = getByTestId('audio-duration');
    expect(durationSpan).toHaveStyle('color: #fff');

    // Click to pause
    fireEvent.click(audioButton);
    expect(getByText('Paused')).toBeInTheDocument();

    // Click to play again
    fireEvent.click(audioButton);
    expect(getByText('Playing')).toBeInTheDocument();
  });

  test('updates audioState via AudioPlayer callbacks', () => {
    const { getByTestId, getByText, container } = render(
      <ArticleAudio audioSrc="https://www.kozco.com/tech/LRMonoPhase4.mp3" />
    );

    // Trigger the 'loadedmetadata' event
    const audio = container.querySelector('audio') as HTMLAudioElement;
    act(() => {
      fireEvent.loadedMetadata(audio);
    });

    const audioButton = getByTestId('audio-button');
    fireEvent.click(audioButton); // Play

    const pauseButton = getByText('Pause');
    fireEvent.click(pauseButton); // Pause
    expect(getByText('Paused')).toBeInTheDocument();

    const playButton = getByText('Play');
    fireEvent.click(playButton); // Play again
    expect(getByText('Playing')).toBeInTheDocument();

    const endedButton = getByText('Ended');
    fireEvent.click(endedButton); // Simulate end of playback
    expect(getByText('Listen')).toBeInTheDocument();
  });
});
test('hides AudioPlayer when close button is clicked', () => {
  const { getByTestId, getByText, container } = render(
    <ArticleAudio audioSrc="https://www.kozco.com/tech/LRMonoPhase4.mp3" />
  );

  // Trigger 'loadedmetadata' event to initialize duration
  const audio = container.querySelector('audio') as HTMLAudioElement;
  act(() => {
    fireEvent.loadedMetadata(audio);
  });

  // Click the audio button to show the AudioPlayer
  const audioButton = getByTestId('audio-button');
  fireEvent.click(audioButton);

  // Verify that the AudioPlayer is now visible
  const audioPlayer = getByTestId('audioPlayerWrapper');
  expect(audioPlayer).toHaveStyle('display: block');

  // Simulate clicking the close button inside the AudioPlayer
  const closeButton = getByText('Close');
  fireEvent.click(closeButton);

  // Verify that the AudioPlayer is hidden again
  expect(audioPlayer).toHaveStyle('display: none');
});
