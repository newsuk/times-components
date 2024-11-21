// AudioPlayer.test.tsx

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AudioPlayer } from '../AudioPlayer';

// Mock the styles and icons imports
jest.mock('./styles', () => ({
  AudioPlayerContainer: 'div',
  Row: 'div',
  CollapseButton: 'button',
  Title: 'div',
  StyledSeekBar: 'input',
  StyledTimeDisplay: 'div',
  Controls: 'div',
  ControlButton: 'button',
  VolumeControlContainer: 'div',
  VolumeLabel: 'label',
  VolumeSlider: 'input',
  SpeedSelectModal: 'div',
  SpeedOptionItem: 'div',
  CloseButton: 'button',
  PlaybackButtonsContainer: 'div',
  SpeedButton: 'button',
  PlayPauseButton: 'button',
  SpeedOptionsContainer: 'div',
  TabletDesktopWrapper: 'div',
  TabletDesktopInnerWrapper: 'div',
  TabletDesktopPlayPauseButton: 'button',
  TabletDesktopStatusText: 'div',
  TabletDesktopVolumeControlContainer: 'div',
  TabletDesktopVolumeButton: 'button',
  TabletDesktopVolumeSlider: 'input',
  TabletDesktopTimeDisplay: 'div',
  TabletDesktopSeekBar: 'input',
  TabletDesktopSpeedButton: 'button',
  TabletDesktopCloseButton: 'button',
  LeftControls: 'div',
  CenterControls: 'div',
  RightControls: 'div',
  SpeedButtonContainer: 'div'
}));

jest.mock('./types', () => ({}));

jest.mock('@times-components/icons', () => ({
  IconCheck: () => <span>IconCheck</span>,
  PlayerModalIcon: () => <span>PlayerModalIcon</span>,
  PlayerBack: () => <span>PlayerBack</span>,
  PlayerFront: () => <span>PlayerFront</span>,
  PlayIcon: () => <span>PlayIcon</span>,
  PauseIcon: () => <span>PauseIcon</span>,
  IconVolume: () => <span>IconVolume</span>,
  AudioCloseIcon: () => <span>AudioCloseIcon</span>
}));

describe('AudioPlayer Component', () => {
  test('renders without crashing', () => {
    const { getByLabelText } = render(<AudioPlayer src="test-audio.mp3" />);
    const playPauseButton = getByLabelText('Play');
    expect(playPauseButton).toBeInTheDocument();
  });

  test('play and pause functionality', () => {
    const { getByLabelText } = render(<AudioPlayer src="test-audio.mp3" />);
    const playPauseButton = getByLabelText('Play');

    // Click to play
    fireEvent.click(playPauseButton);

    // Button should now be 'Pause'
    const pauseButton = getByLabelText('Pause');
    expect(pauseButton).toBeInTheDocument();

    // Click to pause
    fireEvent.click(pauseButton);

    // Button should now be 'Play' again
    const playButtonAgain = getByLabelText('Play');
    expect(playButtonAgain).toBeInTheDocument();
  });
});
