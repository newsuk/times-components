import React from 'react';
import '@testing-library/jest-dom';
import { useBreakpointKey } from 'newskit';
import { render, screen, fireEvent } from '../../../../utils/test-utils';
import { InArticleAudio, InArticleAudioProps } from '..';

jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('xs')
}));

afterEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

const data = {
  src:
    'https://ncu-newskit-docs.s3.eu-west-1.amazonaws.com/storybook-assets/audio_file_1.mp3',
  readyToPlayText: 'Listen to article',
  playingText: 'Playing',
  narrator: 'James Marriott',
  headline: 'Article headline'
};

const renderComponent = (props: InArticleAudioProps) =>
  render(<InArticleAudio {...props} />);

describe('StickyPlayerMob renders', () => {
  test('renders correctly', async () => {
    const { asFragment } = renderComponent(data);
    const playBtn = screen.getByRole('button', { name: 'Play' });
    await fireEvent.click(playBtn);

    expect(asFragment()).toMatchSnapshot();
  });
});

describe('StickyPlayerMob functions', () => {
  beforeEach(async () => {
    (useBreakpointKey as any).mockReturnValue('xs');
    renderComponent(data);

    const playBtn = screen.getByRole('button', { name: 'Play' });
    await fireEvent.click(playBtn);
  });

  test('expands when scrolling text is clicked', async () => {
    const scrollText = screen.queryAllByText(
      `${data.headline} - ${data.narrator}`
    )[0];
    expect(scrollText).toBeVisible();
    expect(scrollText).toHaveStyle({ width: '240px' });

    await fireEvent.click(scrollText);
    const audioSlider = screen.queryAllByTestId('audio-slider');
    expect(audioSlider[0]).toBeVisible();
    expect(audioSlider[1]).not.toBeVisible();
  });

  test('minimises expanded panel when collapse button is clicked', async () => {
    const scrollText = screen.queryAllByText(
      `${data.headline} - ${data.narrator}`
    )[0];
    expect(scrollText).toBeVisible();

    await fireEvent.click(scrollText);
    const collapseButton = screen.getByRole('button', { name: 'Minimise' });
    expect(collapseButton).toBeVisible();

    await fireEvent.click(collapseButton);
    expect(collapseButton).not.toBeVisible();
  });

  test('minimises expanded panel when outside component is clicked', async () => {
    const scrollText = screen.queryAllByText(
      `${data.headline} - ${data.narrator}`
    )[0];
    expect(scrollText).toBeVisible();

    await fireEvent.click(scrollText);
    const collapseButton = screen.getByRole('button', { name: 'Minimise' });
    expect(collapseButton).toBeVisible();

    await fireEvent.click(document);
    expect(collapseButton).not.toBeVisible();
  });

  test('closes sticky player', async () => {
    const closeBtn = screen.getByRole('button', { name: 'Close' });
    expect(closeBtn).toBeVisible();

    await fireEvent.click(closeBtn);
    expect(closeBtn).not.toBeVisible();
  });
});

describe('StickyPlayerDesktop functions', () => {
  test('closes sticky player', async () => {
    (useBreakpointKey as any).mockReturnValue('lg');

    renderComponent(data);

    const playBtn = screen.getByRole('button', { name: 'Play' });
    expect(playBtn).toBeVisible();
    await fireEvent.click(playBtn);

    const closeBtn = screen.getByTestId('CloseBtnDesktop');
    await fireEvent.click(closeBtn);
    expect(closeBtn).not.toBeInTheDocument();
  });
});
