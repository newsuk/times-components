import React from 'react';
import { HeroBanner, HeroBannerProps } from '../index';
import { render } from '../../../../utils/test-utils';
import '@testing-library/jest-dom';

const defaultProps: HeroBannerProps = {
  puzzleName: 'Crossword',
  loginUrl:
    'https://login.thetimes.co.uk?gotoUrl=https://www.thetimes.co.uk/puzzles'
};

const renderComponent = (props: HeroBannerProps) =>
  render(<HeroBanner {...props} />);

describe('HeroBanner', () => {
  it('should render HeroBanner component', () => {
    const { asFragment } = renderComponent(defaultProps);
    expect(asFragment()).toMatchSnapshot();
  });
});
