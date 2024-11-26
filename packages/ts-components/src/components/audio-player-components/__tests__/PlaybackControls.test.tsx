import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { PlaybackControls } from '../PlaybackControls';

// Mocking styled-components
jest.mock('../styles', () => ({
  Row: ({ children }: any) => <div data-testid="row">{children}</div>,
  Controls: ({ children }: any) => <div data-testid="controls">{children}</div>,
  ControlButton: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
  PlaybackButtonsContainer: ({ children }: any) => (
    <div data-testid="playback-buttons-container">{children}</div>
  ),
  SpeedButton: ({ children, ...props }: any) => (
    <button data-testid="speed-button" {...props}>
      {children}
    </button>
  ),
  SpeedSelectModal: ({ children }: any) => (
    <div data-testid="speed-select-modal">{children}</div>
  ),
  SpeedOptionItem: ({ children, ...props }: any) => (
    <div data-testid="speed-option-item" {...props}>
      {children}
    </div>
  ),
  CloseButton: ({ children, ...props }: any) => (
    <button data-testid="close-button" {...props}>
      {children}
    </button>
  ),
  SpeedOptionsContainer: ({ children }: any) => (
    <div data-testid="speed-options-container">{children}</div>
  ),
  PlayPauseButton: ({ children, ...props }: any) => (
    <button data-testid="play-pause-button" {...props}>
      {children}
    </button>
  )
}));

// Mocking icons
jest.mock('@times-components/icons', () => ({
  PlayIcon: () => <svg data-testid="play-icon" />,
  PauseIcon: () => <svg data-testid="pause-icon" />,
  IconCheck: () => <svg data-testid="icon-check" />,
  PlayerBack: () => <svg data-testid="player-back-icon" />,
  PlayerFront: () => <svg data-testid="player-front-icon" />
}));

describe('PlaybackControls', () => {
  const mockTogglePlayPause = jest.fn();
  const mockRewind = jest.fn();
  const mockForward = jest.fn();
  const mockOnSpeedChange = jest.fn();
  const mockSetIsSpeedModalOpen = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props = {}) =>
    render(
      <PlaybackControls
        isPlaying={false}
        togglePlayPause={mockTogglePlayPause}
        rewind={mockRewind}
        forward={mockForward}
        speed={1.0}
        onSpeedChange={mockOnSpeedChange}
        allowTogglePlay={true}
        allowSeek={true}
        allowPlaybackRateChange={true}
        isSpeedModalOpen={false}
        setIsSpeedModalOpen={mockSetIsSpeedModalOpen}
        isMobile={false}
        {...props}
      />
    );

  test('renders correctly with all controls enabled and not playing', () => {
    const { getByTestId, getByLabelText, queryByTestId } = renderComponent();

    expect(getByTestId('row')).toBeInTheDocument();
    expect(getByTestId('controls')).toBeInTheDocument();
    expect(getByTestId('playback-buttons-container')).toBeInTheDocument();

    // Using aria-label to query specific buttons
    expect(getByLabelText('Rewind 10 seconds')).toBeInTheDocument();
    expect(getByLabelText('Play')).toBeInTheDocument();
    expect(getByLabelText('Forward 10 seconds')).toBeInTheDocument();

    expect(getByTestId('play-icon')).toBeInTheDocument();
    expect(getByTestId('speed-button')).toBeInTheDocument();
    expect(queryByTestId('speed-select-modal')).not.toBeInTheDocument();
  });

  test('renders PlayIcon when not playing and PauseIcon when playing', () => {
    const { getByTestId, rerender, queryByTestId } = renderComponent({
      isPlaying: false
    });
    expect(getByTestId('play-icon')).toBeInTheDocument();
    expect(queryByTestId('pause-icon')).not.toBeInTheDocument();

    rerender(
      <PlaybackControls
        isPlaying={true}
        togglePlayPause={mockTogglePlayPause}
        rewind={mockRewind}
        forward={mockForward}
        speed={1.0}
        onSpeedChange={mockOnSpeedChange}
        allowTogglePlay={true}
        allowSeek={true}
        allowPlaybackRateChange={true}
        isSpeedModalOpen={false}
        setIsSpeedModalOpen={mockSetIsSpeedModalOpen}
        isMobile={false}
      />
    );
    expect(getByTestId('pause-icon')).toBeInTheDocument();
    expect(queryByTestId('play-icon')).not.toBeInTheDocument();
  });

  test('calls togglePlayPause when Play/Pause button is clicked', () => {
    const { getByLabelText } = renderComponent();

    const playPauseButton = getByLabelText('Play');
    fireEvent.click(playPauseButton);

    expect(mockTogglePlayPause).toHaveBeenCalledTimes(1);
  });

  test('calls rewind when Rewind button is clicked', () => {
    const { getByLabelText } = renderComponent();

    const rewindButton = getByLabelText('Rewind 10 seconds');
    fireEvent.click(rewindButton);

    expect(mockRewind).toHaveBeenCalledTimes(1);
  });

  test('calls forward when Forward button is clicked', () => {
    const { getByLabelText } = renderComponent();

    const forwardButton = getByLabelText('Forward 10 seconds');
    fireEvent.click(forwardButton);

    expect(mockForward).toHaveBeenCalledTimes(1);
  });

  test('disables Rewind and Forward buttons when allowSeek is false', () => {
    const { getByLabelText } = render(
      <PlaybackControls
        isPlaying={false}
        togglePlayPause={mockTogglePlayPause}
        rewind={mockRewind}
        forward={mockForward}
        speed={1.0}
        onSpeedChange={mockOnSpeedChange}
        allowTogglePlay={true}
        allowSeek={false}
        allowPlaybackRateChange={true}
        isSpeedModalOpen={false}
        setIsSpeedModalOpen={mockSetIsSpeedModalOpen}
        isMobile={false}
      />
    );

    const rewindButton = getByLabelText('Rewind 10 seconds');
    const forwardButton = getByLabelText('Forward 10 seconds');
    const playPauseButton = getByLabelText('Play');

    expect(rewindButton).toBeDisabled();
    expect(forwardButton).toBeDisabled();
    expect(playPauseButton).not.toBeDisabled();
  });

  test('disables Play/Pause button when allowTogglePlay is false', () => {
    const { getByLabelText } = render(
      <PlaybackControls
        isPlaying={false}
        togglePlayPause={mockTogglePlayPause}
        rewind={mockRewind}
        forward={mockForward}
        speed={1.0}
        onSpeedChange={mockOnSpeedChange}
        allowTogglePlay={false}
        allowSeek={true}
        allowPlaybackRateChange={true}
        isSpeedModalOpen={false}
        setIsSpeedModalOpen={mockSetIsSpeedModalOpen}
        isMobile={false}
      />
    );

    const playPauseButton = getByLabelText('Play');
    expect(playPauseButton).toBeDisabled();
  });

  test('opens speed modal when Speed button is clicked', () => {
    const { getByTestId } = renderComponent();

    const speedButton = getByTestId('speed-button');
    fireEvent.click(speedButton);

    expect(mockSetIsSpeedModalOpen).toHaveBeenCalledWith(true);
  });

  test('does not open speed modal when allowPlaybackRateChange is false', () => {
    const { getByTestId } = render(
      <PlaybackControls
        isPlaying={false}
        togglePlayPause={mockTogglePlayPause}
        rewind={mockRewind}
        forward={mockForward}
        speed={1.0}
        onSpeedChange={mockOnSpeedChange}
        allowTogglePlay={true}
        allowSeek={true}
        allowPlaybackRateChange={false}
        isSpeedModalOpen={false}
        setIsSpeedModalOpen={mockSetIsSpeedModalOpen}
        isMobile={false}
      />
    );

    const speedButton = getByTestId('speed-button');
    fireEvent.click(speedButton);

    expect(mockSetIsSpeedModalOpen).not.toHaveBeenCalled();
  });

  test('renders speed modal when isSpeedModalOpen is true', () => {
    const { getByTestId } = render(
      <PlaybackControls
        isPlaying={false}
        togglePlayPause={mockTogglePlayPause}
        rewind={mockRewind}
        forward={mockForward}
        speed={1.0}
        onSpeedChange={mockOnSpeedChange}
        allowTogglePlay={true}
        allowSeek={true}
        allowPlaybackRateChange={true}
        isSpeedModalOpen={true}
        setIsSpeedModalOpen={mockSetIsSpeedModalOpen}
        isMobile={false}
      />
    );

    expect(getByTestId('speed-select-modal')).toBeInTheDocument();
  });

  test('calls onSpeedChange and closes modal when a speed option is clicked', () => {
    const { getAllByTestId } = render(
      <PlaybackControls
        isPlaying={false}
        togglePlayPause={mockTogglePlayPause}
        rewind={mockRewind}
        forward={mockForward}
        speed={1.0}
        onSpeedChange={mockOnSpeedChange}
        allowTogglePlay={true}
        allowSeek={true}
        allowPlaybackRateChange={true}
        isSpeedModalOpen={true}
        setIsSpeedModalOpen={mockSetIsSpeedModalOpen}
        isMobile={false}
      />
    );

    const speedOptions = getAllByTestId('speed-option-item');
    fireEvent.click(speedOptions[2]); // Click on 1.0x

    expect(mockOnSpeedChange).toHaveBeenCalledWith(1.0);
    expect(mockSetIsSpeedModalOpen).toHaveBeenCalledWith(false);
  });

  test('closes speed modal when Close button is clicked', () => {
    const { getByTestId } = render(
      <PlaybackControls
        isPlaying={false}
        togglePlayPause={mockTogglePlayPause}
        rewind={mockRewind}
        forward={mockForward}
        speed={1.0}
        onSpeedChange={mockOnSpeedChange}
        allowTogglePlay={true}
        allowSeek={true}
        allowPlaybackRateChange={true}
        isSpeedModalOpen={true}
        setIsSpeedModalOpen={mockSetIsSpeedModalOpen}
        isMobile={false}
      />
    );

    const closeButton = getByTestId('close-button');
    fireEvent.click(closeButton);

    expect(mockSetIsSpeedModalOpen).toHaveBeenCalledWith(false);
  });

  test('renders correct aria-label based on isPlaying', () => {
    const { getByLabelText, rerender } = renderComponent({ isPlaying: false });
    const playPauseButton = getByLabelText('Play');
    expect(playPauseButton).toHaveAttribute('aria-label', 'Play');

    rerender(
      <PlaybackControls
        isPlaying={true}
        togglePlayPause={mockTogglePlayPause}
        rewind={mockRewind}
        forward={mockForward}
        speed={1.0}
        onSpeedChange={mockOnSpeedChange}
        allowTogglePlay={true}
        allowSeek={true}
        allowPlaybackRateChange={true}
        isSpeedModalOpen={false}
        setIsSpeedModalOpen={mockSetIsSpeedModalOpen}
        isMobile={false}
      />
    );
    const pauseButton = getByLabelText('Pause');
    expect(pauseButton).toHaveAttribute('aria-label', 'Pause');
  });
});
