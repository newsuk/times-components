import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ArticleAudio, { ArticleAudioProps } from '../ArticleAudio';
import { AudioPlayer } from '../../audio-player-components/AudioPlayer';
import { StickyNote } from '../../sticky-note/StickyNote';

// Import jest-dom for extended matchers
import '@testing-library/jest-dom';

// Mock dependencies
jest.mock('../../audio-player-components/AudioPlayer', () => ({
  AudioPlayer: jest.fn(() => <div data-testid="mock-audio-player">Audio Player</div>)
}));

jest.mock('../../sticky-note/StickyNote', () => ({
  StickyNote: jest.fn(() => <div data-testid="mock-sticky-note">Sticky Note</div>)
}));

describe('ArticleAudio Component', () => {
  const audioSrc = 'http://example.com/audio.mp3';
  const setup = (props: Partial<ArticleAudioProps> = {}) => {
    const defaultProps: ArticleAudioProps = {
      audioSrc
    };
    return render(<ArticleAudio {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    // Clear cookies
    document.cookie = 'audioNarrationButtonClicked=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'audioNoticeClicked=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  });

  it('renders without crashing', () => {
    const { getByText } = setup();
    expect(getByText('Listen')).toBeInTheDocument();
  });

  it('displays duration after metadata is loaded', async () => {
    const { getByTestId, container } = setup();
    const audioElement = getByTestId('article-audio') as HTMLAudioElement;

    // Mock the duration
    Object.defineProperty(audioElement, 'duration', {
      value: 120, // 2 minutes
      writable: false
    });

    // Trigger the metadata loaded event
    fireEvent.loadedMetadata(audioElement);

    await waitFor(() => {
      // Use container to query the span containing duration
      const durationSpan = container.querySelector('span');
      expect(durationSpan).toHaveTextContent('3 min');
    });
  });

  it('shows Play button initially', () => {
    const { getByText } = setup();
    expect(getByText('Listen')).toBeInTheDocument();
    // Since the PlayIcon is an SVG, it's better to check for its presence by role or aria-label
    expect(document.querySelector('svg[aria-label="play-icon"]')).toBeInTheDocument();
  });

  it('changes to Playing state when Play button is clicked', () => {
    const { getByText, getByTestId } = setup();
    const playButton = getByText('Listen');
    fireEvent.click(playButton);

    expect(getByText(/Playing/)).toBeInTheDocument();
    expect(AudioPlayer).toHaveBeenCalledWith(
      expect.objectContaining({
        src: audioSrc,
        isPlayingProp: true
      }),
      {}
    );
    expect(getByTestId('mock-audio-player')).toBeInTheDocument();
    // Check if cookie is set
    expect(document.cookie).toContain('audioNarrationButtonClicked=true');
  });

  it('pauses audio when Pause button is clicked', () => {
    const { getByText } = setup();
    const playButton = getByText('Listen');
    fireEvent.click(playButton); // Start playing

    const pauseButton = getByText(/Playing/);
    fireEvent.click(pauseButton);

    expect(getByText(/Paused/)).toBeInTheDocument();
    expect(AudioPlayer).toHaveBeenCalledWith(
      expect.objectContaining({
        isPlayingProp: false
      }),
      {}
    );
  });

  it('hides AudioPlayer when closed', () => {
    const { getByText, getByTestId } = setup();
    const playButton = getByText('Listen');
    fireEvent.click(playButton); // Start playing

    expect(getByTestId('mock-audio-player')).toBeInTheDocument();

    // Simulate onClose
    const audioPlayer = AudioPlayer as jest.Mock;
    const onClose = audioPlayer.mock.calls[0][0].onClose;
    if (onClose) {
      onClose();
    }

    const audioPlayerWrapper = getByTestId('audioPlayerWrapper');
    expect(audioPlayerWrapper).toHaveStyle('display: none');
  });

  it('shows StickyNote when cookies are not set', () => {
    const { getByTestId } = setup();
    expect(getByTestId('mock-sticky-note')).toBeInTheDocument();
  });

  it('does not show StickyNote when cookies are set', () => {
    // Set cookies to prevent StickyNote from showing
    document.cookie = 'audioNarrationButtonClicked=true';
    document.cookie = 'audioNoticeClicked=true';

    const { queryByTestId } = setup();
    expect(queryByTestId('mock-sticky-note')).not.toBeInTheDocument();
  });

  it('handles window resize and updates child position', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    setup();

    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('sets duration correctly based on audio duration', async () => {
    const { getByTestId, container } = setup();
    const audioElement = getByTestId('article-audio') as HTMLAudioElement;

    // Mock the duration
    Object.defineProperty(audioElement, 'duration', {
      value: 250, // 4 minutes and 10 seconds
      writable: false
    });

    // Trigger the metadata loaded event
    fireEvent.loadedMetadata(audioElement);

    await waitFor(() => {
      // Use container to query the span containing duration
      const durationSpan = container.querySelector('span');
      expect(durationSpan).toHaveTextContent('5 min'); // Ceiling of 4.166...
    });
  });
});