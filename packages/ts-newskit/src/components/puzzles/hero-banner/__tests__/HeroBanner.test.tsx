import React from 'react';
import { HeroBanner, HeroBannerProps } from '../index';
import { render, fireEvent } from '../../../../utils/test-utils';
import '@testing-library/jest-dom';

const handleClick = jest.fn();

const defaultProps: HeroBannerProps = {
  puzzleName: 'Crossword',
  puzzleType: 'crossword',
  loginUrl:
    'https://login.thetimes.co.uk?gotoUrl=https://www.thetimes.co.uk/puzzles',
  onClick: handleClick
};

const renderComponent = (props: HeroBannerProps) =>
  render(<HeroBanner {...props} />);

describe('HeroBanner', () => {
  it('should render HeroBanner component', () => {
    const { asFragment } = renderComponent(defaultProps);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render HeroBanner with props', () => {
    const { getByText } = renderComponent(defaultProps);

    const title1 = getByText('Play the Times');
    const title2 = getByText('Crossword');
    expect(title1).toBeInTheDocument();
    expect(title2).toBeInTheDocument();

    const loginButton = getByText('Log In');
    expect(loginButton).toHaveAttribute(
      'href',
      'https://login.thetimes.co.uk?gotoUrl=https://www.thetimes.co.uk/puzzles'
    );
  });

  it('triggers onClick function when clicked', () => {
    const { getByText } = renderComponent(defaultProps);
    const component = getByText('Subscribe');

    fireEvent.click(component);

    expect(handleClick).toHaveBeenCalled();
  });
});
