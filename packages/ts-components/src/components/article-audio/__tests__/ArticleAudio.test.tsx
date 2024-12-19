import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ArticleAudio } from '../ArticleAudio';

jest.mock('../styles', () => ({
  AudioButton: ({ children, onClick, style, ref }: any) => (
    <button
      data-testid="audio-button"
      onClick={onClick}
      style={style}
      ref={ref}
    >
      {children}
    </button>
  ),
  AudioDuration: ({ children, style }: any) => (
    <span data-testid="audio-duration" style={style}>
      {children}
    </span>
  ),
  DurationWrapper: ({ children }: any) => (
    <span data-testid="duration-wrapper">{children}</span>
  ),
}));

jest.mock('@times-components/icons', () => ({
  __esModule: true,
  PlayIcon: ({ fill }: any) => (
    <svg data-testid="play-icon" style={{ fill: fill || '#333' }} />
  ),
  PauseIcon: ({ fill }: any) => (
    <svg data-testid="pause-icon" style={{ fill: fill || '#333' }} />
  ),
}));

jest.mock('../../sticky-note/StickyNote', () => ({
  StickyNote: ({
    title,
    copy,
    position,
    pointerLeftOffset,
    cookieValue,
  }: any) => (
    <div
      data-testid="sticky-note"
      data-title={title}
      data-copy={copy}
      data-cookie={cookieValue}
      style={{ top: position.top, left: position.left, position: 'absolute'}}
    >
      Sticky Note
    </div>
  ),
}));

jest.mock('../../audio-player-components/AudioPlayer', () => ({
  AudioPlayer: ({ onPlay, onPause, onEnded, onClose }: any) => (
    <div data-testid="audio-player">
      <button data-testid="play-button" onClick={onPlay}>Play</button>
      <button data-testid="pause-button" onClick={onPause}>Pause</button>
      <button data-testid="ended-button" onClick={onEnded}>Ended</button>
      <button data-testid="close-button" onClick={onClose}>Close</button>
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
    jest.restoreAllMocks();
    document.cookie = ''; // Clear cookies
  });

  test('updates child position and pointer position on window resize', () => {
    const { getByTestId } = render(
      <ArticleAudio audioSrc="https://www.kozco.com/tech/LRMonoPhase4.mp3" />
    );
  
    const audioButton = getByTestId('audio-button');
    const stickyNote = getByTestId('sticky-note');
  
    // Mock getBoundingClientRect for the audio button
    audioButton.getBoundingClientRect = jest.fn(() => ({
      top: 50, // Simulate the audio button being 50px from the top
      left: 100,
      width: 200,
      height: 50,
      bottom: 100,
      right: 300,
      x: 100,
      y: 50,
      toJSON: () => ({}),
    }));
  
    // Simulate resizing the window
    fireEvent.resize(window);
  
    // Log and check StickyNote's new position
    const stickyNoteTop = parseFloat(stickyNote.style.top);
    console.log('StickyNote top position:', stickyNote.style.top);
    expect(stickyNoteTop).toBeGreaterThan(0);
  });


  test('handles play, pause, and ended events', () => {
    const { getByTestId, getByText, container } = render(
      <ArticleAudio audioSrc="https://www.kozco.com/tech/LRMonoPhase4.mp3" />
    );

    // Trigger 'loadedmetadata' event to initialize duration
    const audio = container.querySelector('audio') as HTMLAudioElement;
    act(() => {
      fireEvent.loadedMetadata(audio);
    });

    const audioButton = getByTestId('audio-button');
    const audioPlayer = getByTestId('audio-player');
    const audioPlayerWrapper = getByTestId('audioPlayerWrapper');

    // **Simulate Play Event** (onPlay)
    const playButton = getByTestId('play-button');
    fireEvent.click(playButton);
    expect(audioButton).toHaveTextContent('Playing');
    expect(audioButton).toHaveStyle('background-color: #1D1D1B');
    expect(audioButton).toHaveStyle('color: #fff');

    // **Simulate Pause Event** (onPause)
    const pauseButton = getByTestId('pause-button');
    fireEvent.click(pauseButton);
    expect(audioButton).toHaveTextContent('Paused');
    expect(audioButton).toHaveStyle('background-color: #1D1D1B');
    expect(audioButton).toHaveStyle('color: #fff');

    // **Ensure AudioPlayer visibility is toggled** after the pause action
    expect(audioPlayerWrapper).toHaveStyle('display: none'); // The AudioPlayer should be hidden after the pause

    // **Simulate Ended Event** (onEnded)
    const endedButton = getByTestId('ended-button');
    fireEvent.click(endedButton);
    expect(audioButton).toHaveTextContent('Listen');
    expect(audioButton).toHaveStyle('background-color: #fff');
    expect(audioButton).toHaveStyle('color: #333');
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
    const closeButton = getByTestId('close-button');
    fireEvent.click(closeButton);

    // Verify that the AudioPlayer is hidden again
    expect(audioPlayer).toHaveStyle('display: none');
    expect(audioButton).toHaveStyle('background-color: #fff');
    expect(audioButton).toHaveStyle('color: #333');
    expect(getByText('Listen')).toBeInTheDocument(); // audioState === 'not-started'
  });
});
