import React from 'react';
import { OffersBanner, OffersBannerProps } from '../index';
import { render, fireEvent } from '../../../../utils/test-utils';

const handleClick = jest.fn();

const defaultProps = {
  onClick: handleClick
};

const renderComponent = (props: OffersBannerProps) =>
  render(<OffersBanner {...props} />);

describe('OffersBanner', () => {
  it('should render OffersBanner component', () => {
    const { asFragment } = renderComponent(defaultProps);
    expect(asFragment()).toMatchSnapshot();
  });

  it('triggers onClick function when clicked', () => {
    const { getByText } = renderComponent(defaultProps);
    const component = getByText('View offers');

    fireEvent.click(component);

    expect(handleClick).toHaveBeenCalled();
  });
});
