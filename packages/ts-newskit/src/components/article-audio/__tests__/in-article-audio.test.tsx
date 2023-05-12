import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '../../../utils/test-utils';
import { InArticleAudio, InArticleAudioProps } from '../index';

export const data = {
  src:
    'https://ncu-newskit-docs.s3.eu-west-1.amazonaws.com/storybook-assets/audio_file_1.mp3',
  readyToPlayText: 'Listen to article',
  playingText: 'Playing',
  narrator: 'James Marriott',
  headline: 'Article headline'
};

export const renderComponent = (props: InArticleAudioProps) =>
  render(<InArticleAudio {...props} />);

describe('Audio player', () => {
  test('renders correctly', () => {
    const { asFragment } = renderComponent(data);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders correctly with default props', () => {
    const loadStub = jest
      .spyOn(window.HTMLMediaElement.prototype, 'load')
      // tslint:disable-next-line
      .mockImplementation(() => {});

    renderComponent({
      ...data,
      readyToPlayText: undefined,
      playingText: undefined
    });

    const readyToPlayDefaultText = screen.getByText('Listen to article');
    const playingDefaultText = screen.queryByText('Playing');

    expect(loadStub).toHaveBeenCalled();
    expect(readyToPlayDefaultText).toBeInTheDocument();
    expect(playingDefaultText).toBeNull();
  });

  test('audio control, when clicking play button', async () => {
    renderComponent({
      ...data,
      readyToPlayText: undefined,
      playingText: undefined
    });

    const playBtn = screen.getByRole('button', { name: 'Play' });
    await fireEvent.click(playBtn);

    const playingDefaultText = screen.queryByText('Playing');
    expect(playingDefaultText).toBeInTheDocument();
  });
});
