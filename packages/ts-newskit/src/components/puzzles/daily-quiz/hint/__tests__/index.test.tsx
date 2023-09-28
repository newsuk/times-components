import React from 'react';
import { Hint } from '../index';
import { render, fireEvent } from '../../../../../utils/test-utils';
import '@testing-library/jest-dom';

describe('Hint', () => {
  it('should render the Hint component', () => {
    const { asFragment } = render(<Hint />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should display the provided title', () => {
    const { getByText } = render(<Hint title="Custom Title" />);
    expect(getByText('Custom Title')).toBeInTheDocument();
  });

  it('should display a default title if title prop is not provided', () => {
    const { getByText } = render(<Hint />);
    expect(getByText('Give me a hint')).toBeInTheDocument();
  });

  it('should increment hintIndex when the button is clicked', () => {
    const { getByText, queryByText } = render(<Hint />);
    fireEvent.click(getByText('Give me a hint'));
    expect(queryByText('Hint 1 of 5')).toBeInTheDocument();
  });

  it('should display hints sequentially when the button is clicked', () => {
    const { getByText, queryByText } = render(<Hint />);
    fireEvent.click(getByText('Give me a hint'));
    fireEvent.click(getByText('Give me a hint'));
    expect(queryByText('Hint 2 of 5')).toBeInTheDocument();
  });

  it('should display the "Hint n of N" text', () => {
    const { getByText } = render(<Hint />);
    fireEvent.click(getByText('Give me a hint'));
    expect(getByText('Hint 1 of 5')).toBeInTheDocument();
  });
});
