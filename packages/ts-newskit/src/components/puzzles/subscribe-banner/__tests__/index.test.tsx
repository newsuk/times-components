import React from 'react';
import { SubscribeBanner, SubscribeBannerProps } from '../index';
import { render, fireEvent } from '../../../../utils/test-utils';
import '@testing-library/jest-dom';

const handleClick = jest.fn();

const defaultProps = {
  SubscribeBannerHeader: 'Start playing today',
  SubscribeBannerSubheadline:
    'Just £1 for your first month, then £4.99 a month thereafter',
  url: 'https://www.thetimes.co.uk/subscribe/puzzles/',
  title: 'Subscribe',
  onClick: handleClick
};

const renderComponent = (props: SubscribeBannerProps) =>
  render(<SubscribeBanner {...props} />);

describe('SubscribeBanner', () => {
  it('should render SubscribeBanner banner component', () => {
    const { asFragment } = renderComponent(defaultProps);
    expect(asFragment()).toMatchSnapshot();
  });

  it('triggers onClick function when clicked', () => {
    const { getByText } = renderComponent(defaultProps);
    const component = getByText('Subscribe');

    fireEvent.click(component);

    expect(handleClick).toHaveBeenCalled();
  });
});
