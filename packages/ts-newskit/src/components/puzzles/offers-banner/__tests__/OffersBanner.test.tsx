import React from 'react';
import { OffersBanner } from '../index';
import { render } from '../../../../utils/test-utils';

const renderComponent = () =>
  render(<OffersBanner />);


describe('OffersBanner', () => {
  it('should render OffersBanner component', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});
