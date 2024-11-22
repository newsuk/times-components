// AudioPlayer.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AudioPlayer } from '../AudioPlayer';


describe('AudioPlayer Component', () => {
  const src = 'test-audio.mp3';
  const title = 'Test Audio';
  
  let mockAudioInstance: any;

  beforeEach(() => {
    // Reset mocks before each test
    jest.resetAllMocks();
    mockAudioInstance = new window.HTMLMediaElement();
    Object.defineProperty(window, 'HTMLMediaElement', {
      writable: true,
      value: jest.fn().mockImplementation(() => mockAudioInstance),
    });
  });

  it('renders without crashing', () => {
    const { getByLabelText } = render(<AudioPlayer src={src} title={title} />);
    expect(getByLabelText('Play')).toBeInTheDocument();
    expect(getByLabelText('Change Playback Speed')).toBeInTheDocument();
  });

  it('plays audio when play button is clicked', async () => {
    const { getByLabelText } = render(<AudioPlayer src={src} title={title} />);
    const playButton = getByLabelText('Play');

    fireEvent.click(playButton);

    await waitFor(() => {
      expect(mockAudioInstance.play).toHaveBeenCalled();
      expect(playButton).toHaveAttribute('aria-label', 'Pause');
    });
  });

  it('pauses audio when pause button is clicked', async () => {
    // Initially playing
    mockAudioInstance.paused = false;
    const { getByLabelText } = render(<AudioPlayer src={src} title={title} />);
    const pauseButton = getByLabelText('Pause');

    fireEvent.click(pauseButton);

    await waitFor(() => {
      expect(mockAudioInstance.pause).toHaveBeenCalled();
      expect(pauseButton).toHaveAttribute('aria-label', 'Play');
    });
  });

  it('rewinds audio by 10 seconds when rewind button is clicked', () => {
    mockAudioInstance.currentTime = 50;
    const { getByLabelText } = render(<AudioPlayer src={src} title={title} />);
    const rewindButton = getByLabelText('Rewind 10 seconds');

    fireEvent.click(rewindButton);

    expect(mockAudioInstance.currentTime).toBe(40);
  });

  it('forwards audio by 10 seconds when forward button is clicked', () => {
    mockAudioInstance.currentTime = 50;
    const { getByLabelText } = render(<AudioPlayer src={src} title={title} />);
    const forwardButton = getByLabelText('Forward 10 seconds');

    fireEvent.click(forwardButton);

    expect(mockAudioInstance.currentTime).toBe(60);
  });

  it('seeks to a specific time when seek bar is changed', () => {
    mockAudioInstance.currentTime = 30;
    const { getByLabelText } = render(<AudioPlayer src={src} title={title} />);
    const seekBar = getByLabelText('Seek Bar') as HTMLInputElement;

    fireEvent.change(seekBar, { target: { value: '45' } });

    expect(mockAudioInstance.currentTime).toBe(45);
  });

  it('disables seek bar when allowSeek is false', () => {
    const { getByLabelText } = render(
      <AudioPlayer src={src} title={title} allowSeek={false} />
    );
    const seekBar = getByLabelText('Seek Bar') as HTMLInputElement;
    expect(seekBar).toBeDisabled();
  });

  it('changes volume when volume slider is adjusted', () => {
    const { getByLabelText } = render(<AudioPlayer src={src} title={title} />);
    const volumeButton = getByLabelText('Volume Control');

    fireEvent.click(volumeButton);

    const volumeSlider = getByLabelText('Volume Control').nextSibling as HTMLInputElement;
    fireEvent.change(volumeSlider, { target: { value: '0.5' } });

    expect(mockAudioInstance.volume).toBe(0.5);
  });

  it('opens and selects a new playback speed from the speed modal', async () => {
    const { getByLabelText, getByText } = render(
      <AudioPlayer src={src} title={title} />
    );
    const speedButton = getByLabelText('Change Playback Speed');

    fireEvent.click(speedButton);

    const speedOption = getByText('1.5x');
    fireEvent.click(speedOption);

    expect(mockAudioInstance.playbackRate).toBe(1.5);
  });

  it('toggles expand/collapse when collapse button is clicked', () => {
    const { getByLabelText, queryByText } = render(
      <AudioPlayer src={src} title={title} />
    );
    const collapseButton = getByLabelText('Collapse Player');

    // Initially expanded
    expect(queryByText(title)).toBeInTheDocument();

    fireEvent.click(collapseButton);

    // After collapse
    expect(queryByText(title)).not.toBeInTheDocument();

    // Toggle back to expand
    fireEvent.click(collapseButton);
    expect(queryByText(title)).toBeInTheDocument();
  });

  it('calls onPlay and onPause callbacks appropriately', async () => {
    const onPlay = jest.fn();
    const onPause = jest.fn();
    const { getByLabelText } = render(
      <AudioPlayer src={src} title={title} onPlay={onPlay} onPause={onPause} />
    );
    const playButton = getByLabelText('Play');

    fireEvent.click(playButton);
    await waitFor(() => {
      expect(onPlay).toHaveBeenCalled();
    });

    const pauseButton = getByLabelText('Pause');
    fireEvent.click(pauseButton);
    expect(onPause).toHaveBeenCalled();
  });

  it('handles autoPlay prop correctly', async () => {
    const onPlay = jest.fn();
    render(
      <AudioPlayer src={src} title={title} autoPlay onPlay={onPlay} />
    );

    await waitFor(() => {
      expect(mockAudioInstance.play).toHaveBeenCalled();
      expect(onPlay).toHaveBeenCalled();
    });
  });

  it('displays the title correctly', () => {
    const { getByText } = render(<AudioPlayer src={src} title={title} />);
    expect(getByText(title)).toBeInTheDocument();
  });

  it('handles onEnded callback when audio finishes playing', () => {
    const onEnded = jest.fn();
    render(<AudioPlayer src={src} title={title} onEnded={onEnded} />);
    
    // Simulate audio ended
    mockAudioInstance.onended();

    expect(onEnded).toHaveBeenCalled();
  });

  it('updates currentTime and duration on time update and metadata load', () => {
    const { getByText } = render(<AudioPlayer src={src} title={title} />);
    
    // Simulate metadata loaded
    mockAudioInstance.duration = 120;
    mockAudioInstance.onloadedmetadata();

    // Simulate time update
    mockAudioInstance.currentTime = 60;
    mockAudioInstance.ontimeupdate();

    expect(getByText('1:00')).toBeInTheDocument();
    expect(getByText('2:00')).toBeInTheDocument();
  });

  it('does not render controls when allowTogglePlay is false', () => {
    const { queryByLabelText } = render(
      <AudioPlayer src={src} title={title} allowTogglePlay={false} />
    );

    expect(queryByLabelText('Play')).not.toBeInTheDocument();
    expect(queryByLabelText('Pause')).not.toBeInTheDocument();
  });

  it('does not render speed controls when allowPlaybackRateChange is false', () => {
    const { queryByLabelText } = render(
      <AudioPlayer src={src} title={title} allowPlaybackRateChange={false} />
    );

    expect(queryByLabelText('Change Playback Speed')).not.toBeInTheDocument();
  });

  it('renders in collapsed state when isExpandedProp is false', () => {
    const { queryByText } = render(
      <AudioPlayer src={src} title={title} isExpandedProp={false} />
    );

    expect(queryByText(title)).not.toBeInTheDocument();
  });

  it('handles onSeek callback when seeking', () => {
    const onSeek = jest.fn();
    const { getByLabelText } = render(
      <AudioPlayer src={src} title={title} onSeek={onSeek} />
    );
    const seekBar = getByLabelText('Seek Bar') as HTMLInputElement;

    fireEvent.change(seekBar, { target: { value: '70' } });

    expect(onSeek).toHaveBeenCalledWith(70);
  });

  it('does not allow seeking beyond duration', () => {
    mockAudioInstance.duration = 100;
    mockAudioInstance.currentTime = 90;
    const { getByLabelText } = render(<AudioPlayer src={src} title={title} />);
    const seekBar = getByLabelText('Seek Bar') as HTMLInputElement;

    fireEvent.change(seekBar, { target: { value: '150' } });

    expect(mockAudioInstance.currentTime).toBe(100); // Clamped to duration
  });

  it('handles volume changes correctly when allowVolumeChange is false', () => {
    const { queryByLabelText } = render(
      <AudioPlayer src={src} title={title} allowVolumeChange={false} />
    );

    expect(queryByLabelText('Volume Control')).not.toBeInTheDocument();
  });

  it('calls onVolumeChange callback when volume is adjusted', () => {
    const onVolumeChange = jest.fn();
    const { getByLabelText } = render(
      <AudioPlayer src={src} title={title} onVolumeChange={onVolumeChange} />
    );
    const volumeButton = getByLabelText('Volume Control');

    fireEvent.click(volumeButton);

    const volumeSlider = volumeButton.nextSibling as HTMLInputElement;
    fireEvent.change(volumeSlider, { target: { value: '0.7' } });

    expect(onVolumeChange).toHaveBeenCalledWith(0.7);
  });

  it('renders the component in desktop view when window width is greater than 520px', () => {
    // Mock window.innerWidth
    global.innerWidth = 1024;
    const { getByLabelText, getByText } = render(
      <AudioPlayer src={src} title={title} />
    );

    expect(getByLabelText('Play')).toBeInTheDocument();
    expect(getByText('Playing')).toBeInTheDocument();
  });

  it('renders the component in mobile view when window width is 520px or less', () => {
    // Mock window.innerWidth
    global.innerWidth = 500;
    const { getByLabelText, queryByText } = render(
      <AudioPlayer src={src} title={title} />
    );

    expect(getByLabelText('Play')).toBeInTheDocument();
    expect(queryByText('Playing')).not.toBeInTheDocument();
  });

  it('handles onClose callback when close button is clicked in desktop view', () => {
    const onClose = jest.fn();
    global.innerWidth = 1024;
    const { getByLabelText } = render(
      <AudioPlayer src={src} title={title} onClose={onClose} />
    );

    const closeButton = getByLabelText('Close Player');
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });

  it('matches snapshot for mobile expanded state', () => {
    global.innerWidth = 500;
    const { asFragment } = render(
      <AudioPlayer src={src} title={title} isExpandedProp={true} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot for desktop view with speed modal open', () => {
    global.innerWidth = 1024;
    const { asFragment, getByLabelText } = render(
      <AudioPlayer src={src} title={title} />
    );

    const speedButton = getByLabelText('Change Playback Speed');
    fireEvent.click(speedButton);

    expect(asFragment()).toMatchSnapshot();
  });

  it('does not render speed modal when allowPlaybackRateChange is false', () => {
    const { queryByText, getByLabelText } = render(
      <AudioPlayer src={src} title={title} allowPlaybackRateChange={false} />
    );

    const speedButton = getByLabelText('Change Playback Speed');
    expect(speedButton).not.toBeInTheDocument();

    expect(queryByText('1.0x')).not.toBeInTheDocument();
  });

  it('handles playback rate changes correctly', () => {
    const { getByLabelText, getByText } = render(
      <AudioPlayer src={src} title={title} />
    );
    const speedButton = getByLabelText('Change Playback Speed');

    fireEvent.click(speedButton);

    const speedOption = getByText('2x');
    fireEvent.click(speedOption);

    expect(mockAudioInstance.playbackRate).toBe(2);
  });

  it('does not allow volume change when allowVolumeChange is false', () => {
    const { queryByLabelText } = render(
      <AudioPlayer src={src} title={title} allowVolumeChange={false} />
    );

    expect(queryByLabelText('Volume Control')).not.toBeInTheDocument();
  });

  it('does not render expand/collapse button when allowExpandCollapse is false', () => {
    const { queryByLabelText } = render(
      <AudioPlayer src={src} title={title} allowExpandCollapse={false} />
    );

    expect(queryByLabelText('Collapse Player')).not.toBeInTheDocument();
  });
});
