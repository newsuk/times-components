import React from 'react';
import { SubscribeBanner, SubscribeBannerProps } from '../index';
import { render } from '../../../../utils/test-utils';
import '@testing-library/jest-dom';
import { BASE_URL } from '../../../../constants';

const renderComponent = (props: SubscribeBannerProps) =>
  render(<SubscribeBanner {...props} />);

const defaultProps = {
  SubscribeBannerHeader: 'Start playing today',
  SubscribeBannerSubheadline:
    'Just £1 for your first month, then £4.99 a month thereafter',
  url: `${BASE_URL}/subscribe/puzzles/`,
  title: 'Subscribe'
};

describe('SubscribeBanner', () => {
  it('should render SubscribeBanner banner component', () => {
    const { asFragment } = renderComponent(defaultProps);
    expect(asFragment()).toMatchSnapshot();
  });
});
