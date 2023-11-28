import React from 'react';
import { render } from '../../../../../utils/test-utils';
import '@testing-library/jest-dom';
import { FinalScreen } from '../index';

const message = 'Well done, you’re a genius!';
const hints = 2;
const ans = 'Cape Verde';
const status = 'Win';

describe('FinalScreen Component', () => {
  it('should render snapshot for FinalScreen Component', () => {
    const { asFragment } = render(
      <FinalScreen message={message} hints={hints} ans={ans} status={status} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should display the provided message', () => {
    const { getByText } = render(
      <FinalScreen message={message} hints={hints} ans={ans} status={status} />,
    );
    expect(getByText(message)).toBeInTheDocument();
  });

  it('should display the provided answer', () => {
    const { getByText } = render(
      <FinalScreen message={message} hints={hints} ans={ans} status={status} />,
    );
    expect(getByText(ans)).toBeInTheDocument();
  });

  it('should display the provided hints', () => {
    const { getByText } = render(
      <FinalScreen message={message} hints={hints} ans={ans} status={status} />,
    );
    expect(getByText(`You did it with ${hints} hints.`)).toBeInTheDocument();
  });

  it('should display "You didn\'t get it this time." for "Lose" status', () => {
    const { getByText } = render(
      <FinalScreen message={message} hints={hints} ans={ans} status="Lose" />,
    );
    expect(getByText("You didn't get it this time.")).toBeInTheDocument();
  });
});
