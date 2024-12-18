import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SeekBar } from '../SeekBar';

// Mocking styled-components
jest.mock('../styles', () => ({
  Row: ({ children }: any) => <div data-testid="row">{children}</div>,
  StyledSeekBar: ({ ...props }: any) => (
    <input data-testid="styled-seekbar" {...props} />
  )
}));

describe('SeekBar', () => {
  const mockOnSeek = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props = {}) =>
    render(
      <SeekBar
        currentTime={0}
        duration={100}
        onSeek={mockOnSeek}
        allowSeek={true}
        {...props}
      />
    );

  test('renders correctly when allowSeek is true', () => {
    const { getByTestId } = renderComponent();

    const row = getByTestId('row');
    const seekBar = getByTestId('styled-seekbar');

    expect(row).toBeInTheDocument();
    expect(seekBar).toBeInTheDocument();
    expect(seekBar).toHaveAttribute('type', 'range');
    expect(seekBar).toHaveAttribute('min', '0');
    expect(seekBar).toHaveAttribute('max', '100');
    expect(seekBar).toHaveAttribute('value', '0');
    expect(seekBar).not.toBeDisabled();
    expect(seekBar).toHaveAttribute('aria-label', 'Seek Bar');
  });

  test('renders correctly when allowSeek is false', () => {
    const { getByTestId } = renderComponent({ allowSeek: false });

    const seekBar = getByTestId('styled-seekbar');
    expect(seekBar).toBeDisabled();
  });

  test('calls onSeek with correct value when slider is moved', () => {
    const { getByTestId } = renderComponent();

    const seekBar = getByTestId('styled-seekbar') as HTMLInputElement;

    // Simulate changing the seek bar value to 50
    fireEvent.change(seekBar, { target: { value: '50' } });

    expect(mockOnSeek).toHaveBeenCalledTimes(1);
    expect(mockOnSeek).toHaveBeenCalledWith(50);
  });

  test('correctly sets progress based on currentTime and duration', () => {
    const { getByTestId, rerender } = renderComponent({
      currentTime: 25,
      duration: 100
    });

    const seekBar = getByTestId('styled-seekbar');
    expect(seekBar).toHaveAttribute('value', '25');

    // Update props
    rerender(
      <SeekBar
        currentTime={75}
        duration={100}
        onSeek={mockOnSeek}
        allowSeek={true}
      />
    );

    expect(seekBar).toHaveAttribute('value', '75');
  });

  test('handles duration of zero gracefully', () => {
    const { getByTestId } = renderComponent({ currentTime: 0, duration: 0 });

    const seekBar = getByTestId('styled-seekbar');
    expect(seekBar).toHaveAttribute('max', '0');
    expect(seekBar).toHaveAttribute('value', '0');
  });
});
