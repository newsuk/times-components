import React from 'react';
import { FreeTrial, FreeTrialProps } from '../index';
import { render } from '../../../../utils/test-utils';
import '@testing-library/jest-dom';

const renderComponent = (props: FreeTrialProps) =>
  render(<FreeTrial {...props} />);

const defaultProps = {
  freeTrialHeader: 'Train your brain with Times Puzzles',
  freeTrialSubheadline: 'Start playing today for just £1 for your first month',
  url: 'https://www.thetimes.co.uk/subscribe/puzzles/',
  title: 'Subscribe Now'
};

describe('FreeTrial', () => {
  it('should render freeTrial banner component', () => {
    const { asFragment } = renderComponent(defaultProps);
    expect(asFragment()).toMatchSnapshot();
  });
});
