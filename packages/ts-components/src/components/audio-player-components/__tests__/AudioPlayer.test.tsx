import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AudioPlayer } from '../AudioPlayer';

jest.mock('../CollapseIcon', () => ({
  CollapseIcon: ({ isExpanded, toggleExpand }: any) => (
    <button data-testid="collapse-icon" onClick={toggleExpand}>
      {isExpanded ? 'Collapse' : 'Expand'}
    </button>
  )
}));

jest.mock('../TitleScroller', () => ({
  TitleScroller: ({ title }: any) => (
    <div data-testid="title-scroller">{title}</div>
  )
}));

jest.mock('../SeekBar', () => ({
  SeekBar: ({ onSeek }: any) => (
    <div data-testid="seek-bar">
      <button onClick={() => onSeek(10)}>Seek Forward</button>
    </div>
  )
}));

jest.mock('../TimeDisplay', () => ({
  TimeDisplay: ({ currentTime, duration }: any) => (
    <div data-testid="time-display">
      {currentTime} / {duration}
    </div>
  )
}));

jest.mock('../PlaybackControls', () => ({
  PlaybackControls: ({ isPlaying, togglePlayPause, rewind, forward }: any) => (
    <div data-testid="playback-controls">
      <button onClick={rewind}>Rewind</button>
      <button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      <button onClick={forward}>Forward</button>
    </div>
  )
}));

jest.mock('../TabletDesktopPlayer', () => ({
  TabletDesktopPlayer: ({ handleVolumeChange }: any) => (
    <div data-testid="tablet-desktop-player">
      <button onClick={() => handleVolumeChange(0.5)}>Set Volume to 0.5</button>
    </div>
  )
}));

jest.mock('../styles', () => ({
  AudioPlayerContainer: ({ children }: any) => (
    <div data-testid="audio-player-container">{children}</div>
  )
}));
describe('AudioPlayer', () => {
  let originalInnerWidth: number;
  let playMock: jest.Mock;
  let pauseMock: jest.Mock;
  let mockPaused: boolean;
  let mockDuration: number;

  beforeAll(() => {
    originalInnerWidth = window.innerWidth;
  });

  beforeEach(() => {
    playMock = jest.fn().mockImplementation(() => {
      mockPaused = false;
      return Promise.resolve();
    });
    pauseMock = jest.fn().mockImplementation(() => {
      mockPaused = true;
    });
    mockPaused = true; // Initially paused
    mockDuration = 100; // Set a positive duration

    jest
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(playMock);
    jest
      .spyOn(window.HTMLMediaElement.prototype, 'pause')
      .mockImplementation(pauseMock);
    jest
      .spyOn(window.HTMLMediaElement.prototype, 'paused', 'get')
      .mockImplementation(() => mockPaused);
    jest
      .spyOn(window.HTMLMediaElement.prototype, 'duration', 'get')
      .mockImplementation(() => mockDuration);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    // Restore the original innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
    jest.restoreAllMocks();
  });

  const setWindowInnerWidth = (width: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
    // Dispatch a resize event to notify listeners
    window.dispatchEvent(new Event('resize'));
  };

  const renderComponent = (props = {}) =>
    render(<AudioPlayer src="test.mp3" {...props} />);

  test('renders correctly on mobile', () => {
    setWindowInnerWidth(500);
    const { getByTestId, queryByTestId } = renderComponent();

    expect(getByTestId('audio-player-container')).toBeInTheDocument();
    expect(getByTestId('collapse-icon')).toBeInTheDocument();
    expect(getByTestId('title-scroller')).toHaveTextContent('Audio Title');
    expect(getByTestId('seek-bar')).toBeInTheDocument();
    expect(getByTestId('playback-controls')).toBeInTheDocument();
    expect(queryByTestId('tablet-desktop-player')).not.toBeInTheDocument();
  });

  test('renders correctly on desktop', () => {
    setWindowInnerWidth(1024);
    const { getByTestId, queryByTestId } = renderComponent();

    expect(getByTestId('tablet-desktop-player')).toBeInTheDocument();
    expect(queryByTestId('audio-player-container')).not.toBeInTheDocument();
  });

  test('play and pause functionality', async () => {
    setWindowInnerWidth(500);
    const onPlay = jest.fn();
    const onPause = jest.fn();
    const { getByText } = renderComponent({ onPlay, onPause });

    const playButton = getByText('Play');
    await act(async () => {
      fireEvent.click(playButton);
    });

    expect(playMock).toHaveBeenCalled();
    await waitFor(() => expect(onPlay).toHaveBeenCalled());
    expect(getByText('Pause')).toBeInTheDocument();

    const pauseButton = getByText('Pause');
    await act(async () => {
      fireEvent.click(pauseButton);
    });

    expect(pauseMock).toHaveBeenCalled();
    await waitFor(() => expect(onPause).toHaveBeenCalled());
    expect(getByText('Play')).toBeInTheDocument();
  });

  test('volume change', () => {
    setWindowInnerWidth(1024);
    const onVolumeChange = jest.fn();
    const { getByText } = renderComponent({ onVolumeChange });

    const volumeButton = getByText('Set Volume to 0.5');
    fireEvent.click(volumeButton);

    expect(onVolumeChange).toHaveBeenCalledWith(0.5);
  });

  test('expand and collapse', () => {
    setWindowInnerWidth(500);
    const { getByTestId, queryByTestId } = renderComponent();

    const collapseButton = getByTestId('collapse-icon');
    expect(getByTestId('title-scroller')).toBeInTheDocument();

    fireEvent.click(collapseButton);
    expect(queryByTestId('title-scroller')).not.toBeInTheDocument();

    fireEvent.click(collapseButton);
    expect(getByTestId('title-scroller')).toBeInTheDocument();
  });

  test('handles isPlayingProp changes', async () => {
    setWindowInnerWidth(500);
    const { rerender, getByText } = render(
      <AudioPlayer src="test.mp3" isPlayingProp={false} />
    );

    expect(getByText('Play')).toBeInTheDocument();

    // Change isPlayingProp to true
    await act(async () => {
      rerender(<AudioPlayer src="test.mp3" isPlayingProp={true} />);
    });

    expect(playMock).toHaveBeenCalled();
    expect(getByText('Pause')).toBeInTheDocument();

    // Change isPlayingProp to false
    await act(async () => {
      rerender(<AudioPlayer src="test.mp3" isPlayingProp={false} />);
    });

    expect(pauseMock).toHaveBeenCalled();
    expect(getByText('Play')).toBeInTheDocument();
  });

  test('handles isExpandedProp changes', () => {
    setWindowInnerWidth(500);
    const { rerender, getByTestId, queryByTestId } = render(
      <AudioPlayer src="test.mp3" isExpandedProp={false} />
    );

    expect(queryByTestId('title-scroller')).not.toBeInTheDocument();

    rerender(<AudioPlayer src="test.mp3" isExpandedProp={true} />);
    expect(getByTestId('title-scroller')).toBeInTheDocument();
  });

  test('handles onTimeUpdate', () => {
    setWindowInnerWidth(500);
    const onTimeUpdate = jest.fn();
    const { container } = renderComponent({ onTimeUpdate });

    const audio = container.querySelector('audio') as HTMLAudioElement;
    act(() => {
      fireEvent.timeUpdate(audio);
    });

    expect(onTimeUpdate).toHaveBeenCalled();
  });

  test('handles onEnded', () => {
    setWindowInnerWidth(500);
    const onEnded = jest.fn();
    const { container } = renderComponent({ onEnded });

    const audio = container.querySelector('audio') as HTMLAudioElement;
    act(() => {
      fireEvent.ended(audio);
    });

    expect(onEnded).toHaveBeenCalled();
  });

  test('handles window resize', () => {
    setWindowInnerWidth(500);
    const { getByTestId, queryByTestId } = renderComponent();

    expect(getByTestId('audio-player-container')).toBeInTheDocument();
    expect(queryByTestId('tablet-desktop-player')).not.toBeInTheDocument();

    setWindowInnerWidth(1024);

    expect(queryByTestId('audio-player-container')).not.toBeInTheDocument();
    expect(getByTestId('tablet-desktop-player')).toBeInTheDocument();
  });
});