import React from 'react';
import { render, screen } from '@testing-library/react';
import { AudioPlayer } from '../AudioPlayer';

describe('AudioPlayer Component', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500
    });

    window.dispatchEvent(new Event('resize'));
  });

  test('renders without crashing and displays default title', () => {
    const { container } = render(<AudioPlayer src="test-audio.mp3" />);

    const titleElement = screen.getByText(/Audio Title/i);
    expect(titleElement).toBeTruthy();

    const audioElement = container.querySelector('audio');
    expect(audioElement).toBeTruthy();
  });

  test('renders without crashing and displays custom title', () => {
    const customTitle = 'Test Audio Player';
    const { container } = render(
      <AudioPlayer src="test-audio.mp3" title={customTitle} />
    );

    const titleElement = screen.getByText(new RegExp(customTitle, 'i'));
    expect(titleElement).toBeTruthy();

    const audioElement = container.querySelector('audio');
    expect(audioElement).toBeTruthy();
  });
});
