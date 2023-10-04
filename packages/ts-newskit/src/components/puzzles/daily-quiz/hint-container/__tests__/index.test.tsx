import React from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import { PuzzlesWebLightTheme } from '../../../../../theme';
import { NewsKitProvider } from 'newskit'; // Assuming this is the correct import path
import { HintContainer } from '../index';

let container: RenderResult;

beforeEach(() => {
  const Hints = [
    { text: 'This is the first hint.' },
    { text: 'This is the second hint.' },
    { text: 'This is the third hint.' },
    { text: 'This is the fourth hint.' },
    { text: 'This is the fifth hint.' }
  ];

  container = render(
    <NewsKitProvider theme={PuzzlesWebLightTheme}>
      <HintContainer hints={Hints} />
    </NewsKitProvider>
  );
});

describe('HintContainer', () => {
  it('should render the HintContainer component', () => {
    const { asFragment } = container;
    expect(asFragment()).toMatchSnapshot();
  });

  it('should disable the button when all hints are displayed', () => {
    const { getByText, getByTestId } = container;
    fireEvent.click(getByText('Give me a hint'));
    fireEvent.click(getByText('Give me a hint'));
    fireEvent.click(getByText('Give me a hint'));
    fireEvent.click(getByText('Give me a hint'));
    fireEvent.click(getByText('Give me a hint'));
    const button = getByTestId('button');
    expect(button.getAttribute('disabled')).toBe('');
  });
});
