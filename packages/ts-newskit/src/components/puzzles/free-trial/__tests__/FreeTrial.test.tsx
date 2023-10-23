import React from 'react';
import { FreeTrial, FreeTrialProps } from '../index';
import { render } from '../../../../utils/test-utils';
import '@testing-library/jest-dom';
import { BASE_URL } from '../../../../constants';

const renderComponent = (props: FreeTrialProps) =>
  render(<FreeTrial {...props} />);

const defaultProps = {
  freeTrialHeader: 'Train your brain with Times Puzzles',
  freeTrialSubheadline: 'Start playing today for just £1 for your first month',
  url: `${BASE_URL}/subscribe/puzzles/`,
  title: 'Subscribe Now'
};

describe('FreeTrial', () => {
  it('should render freeTrial banner component', () => {
    const { asFragment } = renderComponent(defaultProps);
    expect(asFragment()).toMatchSnapshot();
  });
});
