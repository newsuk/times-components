import React from 'react';
import { HintButton } from '../index';
import { render, fireEvent } from '../../../../../utils/test-utils';
import '@testing-library/jest-dom';

describe('HintButton', () => {
  const onClick = jest.fn();
  it('should render the HintButton component', () => {
    const { asFragment } = render(
      <HintButton onClick={onClick} disabled={false} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should display the provided title', () => {
    const onClickHandler = jest.fn();
    const { getByText } = render(
      <HintButton
        title="Custom Title"
        onClick={onClickHandler}
        disabled={false}
      />
    );
    expect(getByText('Custom Title')).toBeInTheDocument();
  });

  it('should display a default title if title prop is not provided', () => {
    const onClickHandler = jest.fn();
    const { getByText } = render(
      <HintButton onClick={onClickHandler} disabled={false} />
    );
    expect(getByText('Give me a hint')).toBeInTheDocument();
  });

  it('should trigger the onClick function when clicked', () => {
    const onClickHandler = jest.fn();
    const { getByText } = render(
      <HintButton onClick={onClickHandler} disabled={false} />
    );
    fireEvent.click(getByText('Give me a hint'));
    expect(onClickHandler).toHaveBeenCalledTimes(1);
  });

  it('should disable the button when disabled prop is true', () => {
    const onClickHandler = jest.fn();
    const { getByTestId } = render(
      <HintButton onClick={onClickHandler} disabled={true} />
    );
    const button = getByTestId('button');
    expect(button).toHaveAttribute('disabled');
  });
});
