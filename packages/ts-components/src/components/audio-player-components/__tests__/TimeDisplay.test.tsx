import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TimeDisplay } from '../TimeDisplay';
// Mocking styled-components
jest.mock('../styles', () => ({
  Row: ({ children }: any) => <div data-testid="row">{children}</div>,
  StyledTimeDisplay: ({ children }: any) => (
    <div data-testid="styled-time-display">{children}</div>
  )
}));

// Mocking utils
jest.mock('../utils', () => ({
  formatTime: jest.fn((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  })
}));

import { formatTime } from '../utils';

describe('TimeDisplay', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    const { getByTestId } = render(
      <TimeDisplay currentTime={0} duration={0} />
    );

    expect(getByTestId('row')).toBeInTheDocument();
    expect(getByTestId('styled-time-display')).toBeInTheDocument();
  });

  test('displays correctly formatted currentTime and duration', () => {
    (formatTime as jest.Mock).mockImplementation((seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    });

    const { getByTestId } = render(
      <TimeDisplay currentTime={65} duration={125} />
    );

    expect(getByTestId('current-time')).toHaveTextContent('1:05');
    expect(getByTestId('duration')).toHaveTextContent('2:05');
  });

  test('handles currentTime of 0 seconds', () => {
    const { getByTestId } = render(
      <TimeDisplay currentTime={0} duration={120} />
    );

    expect(getByTestId('current-time')).toHaveTextContent('0:00');
    expect(getByTestId('duration')).toHaveTextContent('2:00');
  });

  test('handles duration of 0 seconds', () => {
    const { getByTestId } = render(
      <TimeDisplay currentTime={60} duration={0} />
    );

    expect(getByTestId('current-time')).toHaveTextContent('1:00');
    expect(getByTestId('duration')).toHaveTextContent('0:00');
  });

  test('handles large numbers gracefully', () => {
    const { getByTestId } = render(
      <TimeDisplay currentTime={3600} duration={7200} />
    ); // 1 hour and 2 hours

    expect(getByTestId('current-time')).toHaveTextContent('60:00');
    expect(getByTestId('duration')).toHaveTextContent('120:00');
  });

  test('calls formatTime with correct arguments', () => {
    render(<TimeDisplay currentTime={90} duration={180} />);

    expect(formatTime).toHaveBeenCalledTimes(2);
    expect(formatTime).toHaveBeenCalledWith(90);
    expect(formatTime).toHaveBeenCalledWith(180);
  });

  test('accessibility: contains semantic HTML elements', () => {
    const { getByTestId } = render(
      <TimeDisplay currentTime={45} duration={150} />
    );

    const row = getByTestId('row');
    const styledTimeDisplay = getByTestId('styled-time-display');
    const currentTime = getByTestId('current-time');
    const duration = getByTestId('duration');

    expect(row.tagName).toBe('DIV');
    expect(styledTimeDisplay.tagName).toBe('DIV');
    expect(currentTime.tagName).toBe('SPAN');
    expect(duration.tagName).toBe('SPAN');
  });
});
