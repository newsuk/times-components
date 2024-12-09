import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import { AudioButton } from '../styles';

describe('AudioButton', () => {
  test('renders correctly with default styles', () => {
    const { getByTestId } = render(
      <AudioButton data-testid="audio-button">Test Button</AudioButton>
    );

    const button = getByTestId('audio-button');

    expect(button).toHaveStyleRule('background-color', 'unset');
    expect(button).toHaveStyleRule('border-radius', '0');
    expect(button).toHaveStyleRule('padding', '6px 11px');
    expect(button).toHaveStyleRule('border', '1px solid #333333');
    expect(button).toHaveStyleRule('display', 'flex');
    expect(button).toHaveStyleRule('align-items', 'center');
    expect(button).toHaveStyleRule('color', '#333333');
    expect(button).toHaveStyleRule('font-family', 'Roboto');
    expect(button).toHaveStyleRule('font-weight', '500');
    expect(button).toHaveStyleRule('font-size', '14px');
    expect(button).toHaveStyleRule('line-height', '18px');
  });

  test('renders svg child with correct styles', () => {
    const { getByTestId } = render(
      <AudioButton data-testid="audio-button">
        <svg data-testid="icon" />
      </AudioButton>
    );

    const button = getByTestId('audio-button');

    expect(button).toHaveStyleRule('margin-right', '8px', {
      modifier: 'svg'
    });
  });

  test('renders span child with correct styles', () => {
    const { getByTestId } = render(
      <AudioButton data-testid="audio-button">
        <span data-testid="span">Test Span</span>
      </AudioButton>
    );

    const button = getByTestId('audio-button');

    expect(button).toHaveStyleRule('margin-left', '4px', {
      modifier: 'span'
    });
    expect(button).toHaveStyleRule('font-size', '12px', {
      modifier: 'span'
    });
    expect(button).toHaveStyleRule('color', '#696969', {
      modifier: 'span'
    });
  });
});
