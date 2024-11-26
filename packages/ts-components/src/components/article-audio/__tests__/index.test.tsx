import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ArticleAudio } from '../ArticleAudio';
//import { AudioPlayer } from '../audio-player-components/AudioPlayer';

// Mock the AudioPlayer component and icons (to avoid dealing with actual rendering of assets)
jest.mock('../audio-player-components/AudioPlayer', () => ({
  AudioPlayer: jest.fn(() => <div>Mocked Audio Player</div>),
}));

jest.mock('./assets/PlayIcon', () => () => <span>PlayIcon</span>);
jest.mock('./assets/PauseIcon', () => () => <span>PauseIcon</span>);

describe('ArticleAudio component', () => {
  const audioSrc = 'https://www.kozco.com/tech/LRMonoPhase4.mp3';

  it('renders the component and button with correct initial state', () => {
    render(<ArticleAudio audioSrc={audioSrc} />);
    
    const audioButton = screen.getByRole('button');
    expect(audioButton).toBeInTheDocument();
    expect(screen.getByText('Listen')).toBeInTheDocument(); // Initially should show "Listen"
    expect(screen.getByText('0 min')).toBeInTheDocument();  // Duration should be null initially
  });

  it('shows the correct duration when audio metadata is loaded', async () => {
    render(<ArticleAudio audioSrc={audioSrc} />);
    
    const audioElement = screen.getByRole('audio');
    
    // Simulate metadata loading
    fireEvent.loadedMetadata(audioElement);

    await waitFor(() => {
      expect(screen.getByText('1 min')).toBeInTheDocument();  // Assuming audio duration is >0
    });
  });

  it('toggles play/pause state on button click', () => {
    render(<ArticleAudio audioSrc={audioSrc} />);
    
    const audioButton = screen.getByRole('button');

    // Click to play
    fireEvent.click(audioButton);
    expect(screen.getByText('Paused')).toBeInTheDocument();  // Should show 'Paused' after first click
    expect(screen.getByText('1 min')).toBeInTheDocument();   // Duration should still be displayed
    
    // Click to pause
    fireEvent.click(audioButton);
    expect(screen.getByText('Listen')).toBeInTheDocument();  // Should show 'Listen' again
  });

  it('shows audio player when the audio is played', async () => {
    render(<ArticleAudio audioSrc={audioSrc} />);
    
    const audioButton = screen.getByRole('button');
    
    // Click to start the audio
    fireEvent.click(audioButton);
    
    await waitFor(() => {
      expect(screen.getByText('Mocked Audio Player')).toBeInTheDocument();
    });
  });

  it('hides the audio player when the audio is paused', async () => {
    render(<ArticleAudio audioSrc={audioSrc} />);
    
    const audioButton = screen.getByRole('button');
    
    // Play the audio (this will show the audio player)
    fireEvent.click(audioButton);
    
    await waitFor(() => {
      expect(screen.getByText('Mocked Audio Player')).toBeInTheDocument();
    });

    // Pause the audio (this will hide the audio player)
    fireEvent.click(audioButton);
    
    await waitFor(() => {
      expect(screen.queryByText('Mocked Audio Player')).not.toBeInTheDocument();
    });
  });

  it('should handle audio onEnded event', async () => {
    render(<ArticleAudio audioSrc={audioSrc} />);
    
    const audioButton = screen.getByRole('button');
    
    // Click to play the audio
    fireEvent.click(audioButton);

    // Simulate the audio ending
    const audioElement = screen.getByRole('audio');
    fireEvent.ended(audioElement);

    await waitFor(() => {
      expect(screen.getByText('Listen')).toBeInTheDocument();  // Should go back to 'Listen' when audio ends
    });
  });
});