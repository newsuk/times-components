import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TabletDesktopPlayer } from '../TabletDesktopPlayer';

// Mocking styled-components
jest.mock('../styles', () => ({
  TabletDesktopWrapper: ({ children }: any) => (
    <div data-testid="tablet-desktop-wrapper">{children}</div>
  ),
  TabletDesktopInnerWrapper: ({ children }: any) => (
    <div data-testid="tablet-desktop-inner-wrapper">{children}</div>
  ),
  LeftControls: ({ children }: any) => (
    <div data-testid="left-controls">{children}</div>
  ),
  CenterControls: ({ children }: any) => (
    <div data-testid="center-controls">{children}</div>
  ),
  RightControls: ({ children }: any) => (
    <div data-testid="right-controls">{children}</div>
  ),
  TabletDesktopPlayPauseButton: ({ children, ...props }: any) => (
    <button data-testid="play-pause-button" {...props}>
      {children}
    </button>
  ),
  TabletDesktopStatusText: ({ children }: any) => (
    <div data-testid="status-text">{children}</div>
  ),
  TabletDesktopVolumeControlContainer: ({ children }: any) => (
    <div data-testid="volume-control-container">{children}</div>
  ),
  TabletDesktopVolumeButton: ({ children, ...props }: any) => (
    <button data-testid="volume-button" {...props}>
      {children}
    </button>
  ),
  TabletDesktopVolumeSlider: ({ ...props }: any) => (
    <input data-testid="volume-slider" {...props} />
  ),
  TabletDesktopTimeDisplay: ({ children, testId }: any) => (
    <div data-testid={testId || 'time-display'}>{children}</div>
  ),
  TabletDesktopSeekBar: ({ ...props }: any) => (
    <input data-testid="seek-bar" {...props} />
  ),
  TabletDesktopSpeedButton: ({ children, ...props }: any) => (
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
  TabletDesktopCloseButton: ({ children, ...props }: any) => (
    <button data-testid="close-button" {...props}>
      {children}
    </button>
  ),
  SpeedButtonContainer: ({ children }: any) => (
    <div data-testid="speed-button-container">{children}</div>
  ),
  SpeedOptionsContainer: ({ children }: any) => (
    <div data-testid="speed-options-container">{children}</div>
  )
}));

// Mocking icons
jest.mock('@times-components/icons', () => ({
  PlayIcon: () => <svg data-testid="play-icon" />,
  PauseIcon: () => <svg data-testid="pause-icon" />,
  IconVolume: () => <svg data-testid="icon-volume" />,
  IconCheck: () => <svg data-testid="icon-check" />,
  AudioCloseIcon: () => <svg data-testid="audio-close-icon" />
}));

// Mocking utils
jest.mock('../utils', () => ({
  formatTime: (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
}));

describe('TabletDesktopPlayer', () => {
  const mockTogglePlayPause = jest.fn();
  const mockHandleSeek = jest.fn();
  const mockHandleVolumeChange = jest.fn();
  const mockHandleSpeedSelect = jest.fn();
  const mockSetIsSpeedModalOpen = jest.fn();
  const mockSetIsVolumeSliderVisible = jest.fn();
  const mockOnClose = jest.fn();
  const mockSetVolume = jest.fn();
  const mockHandleSpeedChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    isPlaying: false,
    togglePlayPause: mockTogglePlayPause,
    currentTime: 30,
    duration: 120,
    allowTogglePlay: true,
    allowSeek: true,
    allowVolumeChange: true,
    volume: 0.5,
    handleSeek: mockHandleSeek,
    handleVolumeChange: mockHandleVolumeChange,
    speed: 1.0,
    allowPlaybackRateChange: true,
    isSpeedModalOpen: false,
    setIsSpeedModalOpen: mockSetIsSpeedModalOpen,
    speedOptions: [0.5, 1.0, 1.5, 2.0],
    handleSpeedSelect: mockHandleSpeedSelect,
    isVolumeSliderVisible: false,
    setIsVolumeSliderVisible: mockSetIsVolumeSliderVisible,
    onClose: mockOnClose,
    allowExpandCollapse: true,
    isMobile: false,
    audioRef: React.createRef<HTMLAudioElement>(),
    setVolume: mockSetVolume,
    handleSpeedChange: mockHandleSpeedChange
  };

  const renderComponent = (props = {}) =>
    render(<TabletDesktopPlayer {...defaultProps} {...props} />);

  test('renders correctly with all controls enabled and not playing', () => {
    const { getByTestId, getAllByTestId, queryByTestId } = renderComponent();

    // Wrapper and Inner Wrapper
    expect(getByTestId('tablet-desktop-wrapper')).toBeInTheDocument();
    expect(getByTestId('tablet-desktop-inner-wrapper')).toBeInTheDocument();

    // Left Controls
    expect(getByTestId('left-controls')).toBeInTheDocument();
    expect(getByTestId('play-pause-button')).toBeInTheDocument();
    expect(getByTestId('status-text')).toHaveTextContent('Paused');
    expect(getByTestId('volume-control-container')).toBeInTheDocument();
    expect(getByTestId('volume-button')).toBeInTheDocument();
    expect(queryByTestId('volume-slider')).not.toBeInTheDocument();

    // Center Controls
    expect(getByTestId('center-controls')).toBeInTheDocument();
    const timeDisplays = getAllByTestId('time-display');
    expect(timeDisplays[0].textContent).toBe('0:30');
    expect(getByTestId('seek-bar')).toBeInTheDocument();
    expect(getByTestId('seek-bar')).toHaveAttribute('min', '0');
    expect(getByTestId('seek-bar')).toHaveAttribute('max', '120');
    expect(getByTestId('seek-bar')).toHaveAttribute('value', '30');
    expect(getByTestId('seek-bar')).not.toBeDisabled();
    expect(getByTestId('seek-bar')).toHaveAttribute('aria-label', 'Seek Bar');
    expect(timeDisplays[1].textContent).toBe('2:00');

    // Right Controls
    expect(getByTestId('right-controls')).toBeInTheDocument();
    expect(getByTestId('speed-button-container')).toBeInTheDocument();
    expect(getByTestId('speed-button')).toBeInTheDocument();
    expect(queryByTestId('speed-select-modal')).not.toBeInTheDocument();
    expect(getByTestId('close-button')).toBeInTheDocument();
  });

  test('renders PlayIcon when not playing and PauseIcon when playing', () => {
    const { getByTestId, rerender, queryByTestId } = renderComponent({
      isPlaying: false
    });
    expect(getByTestId('play-icon')).toBeInTheDocument();
    expect(queryByTestId('pause-icon')).not.toBeInTheDocument();

    rerender(<TabletDesktopPlayer {...defaultProps} isPlaying={true} />);
    expect(getByTestId('pause-icon')).toBeInTheDocument();
    expect(queryByTestId('play-icon')).not.toBeInTheDocument();
  });

  test('calls togglePlayPause when Play/Pause button is clicked', () => {
    const { getByLabelText } = renderComponent();

    const playPauseButton = getByLabelText('Play');
    fireEvent.click(playPauseButton);

    expect(mockTogglePlayPause).toHaveBeenCalledTimes(1);
  });

  test('calls handleSeek when Seek Bar is moved', () => {
    const { getByTestId } = renderComponent();

    const seekBar = getByTestId('seek-bar') as HTMLInputElement;
    fireEvent.change(seekBar, { target: { value: '60' } });

    expect(mockHandleSeek).toHaveBeenCalledTimes(1);
    expect(mockHandleSeek).toHaveBeenCalledWith(60);
  });

  test('calls handleVolumeChange when volume slider is adjusted', () => {
    const { getByTestId } = render(
      <TabletDesktopPlayer {...defaultProps} isVolumeSliderVisible={true} />
    );

    const volumeSlider = getByTestId('volume-slider') as HTMLInputElement;
    fireEvent.change(volumeSlider, { target: { value: '0.7' } });

    expect(mockHandleVolumeChange).toHaveBeenCalledTimes(1);
    expect(mockHandleVolumeChange).toHaveBeenCalledWith(0.7);
  });

  test('opens speed modal when Speed button is clicked', () => {
    const { getByTestId } = renderComponent();

    const speedButton = getByTestId('speed-button');
    fireEvent.click(speedButton);

    expect(mockSetIsSpeedModalOpen).toHaveBeenCalledWith(true);
  });

  test('does not render speed button when allowPlaybackRateChange is false', () => {
    const { queryByTestId } = render(
      <TabletDesktopPlayer {...defaultProps} allowPlaybackRateChange={false} />
    );

    expect(queryByTestId('speed-button-container')).not.toBeInTheDocument();
  });

  test('renders speed modal when isSpeedModalOpen is true', () => {
    const { getByTestId } = render(
      <TabletDesktopPlayer {...defaultProps} isSpeedModalOpen={true} />
    );

    expect(getByTestId('speed-select-modal')).toBeInTheDocument();
  });

  test('calls onClose when Close button is clicked', () => {
    const { getByLabelText } = renderComponent();

    const closeButton = getByLabelText('Close Player');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('does not render volume controls when allowVolumeChange is false', () => {
    const { queryByTestId } = render(
      <TabletDesktopPlayer {...defaultProps} allowVolumeChange={false} />
    );

    expect(queryByTestId('volume-control-container')).not.toBeInTheDocument();
  });

  test('does not render speed controls when allowPlaybackRateChange is false', () => {
    const { queryByTestId } = render(
      <TabletDesktopPlayer {...defaultProps} allowPlaybackRateChange={false} />
    );

    expect(queryByTestId('speed-button-container')).not.toBeInTheDocument();
  });

  test('does not render Close button when allowExpandCollapse is false', () => {
    const { queryByTestId } = render(
      <TabletDesktopPlayer {...defaultProps} allowExpandCollapse={false} />
    );

    expect(queryByTestId('close-button')).not.toBeInTheDocument();
  });

  test('correctly displays formatted currentTime and duration', () => {
    const { getAllByTestId } = renderComponent();

    const timeDisplays = getAllByTestId('time-display');
    expect(timeDisplays[0].textContent).toBe('0:30');
    expect(timeDisplays[1].textContent).toBe('2:00');
  });

  test('sets correct attributes on Seek Bar based on props', () => {
    const { getByTestId } = renderComponent();

    const seekBar = getByTestId('seek-bar');
    expect(seekBar).toHaveAttribute('type', 'range');
    expect(seekBar).toHaveAttribute('min', '0');
    expect(seekBar).toHaveAttribute('max', '120');
    expect(seekBar).toHaveAttribute('value', '30');
    expect(seekBar).not.toBeDisabled();
    expect(seekBar).toHaveAttribute('aria-label', 'Seek Bar');
    expect(seekBar).toHaveAttribute('progress', '25');
  });

  test('handles duration of zero gracefully', () => {
    const { getByTestId } = render(
      <TabletDesktopPlayer {...defaultProps} currentTime={0} duration={0} />
    );

    const seekBar = getByTestId('seek-bar');
    expect(seekBar).toHaveAttribute('max', '0');
    expect(seekBar).toHaveAttribute('value', '0');
    expect(seekBar).toHaveAttribute('progress', '0');
  });
});
