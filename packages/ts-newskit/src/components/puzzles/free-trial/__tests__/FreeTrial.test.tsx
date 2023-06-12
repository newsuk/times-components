import React from 'react';
import { FreeTrial, FreeTrialProps } from '../index';
import { render } from '../../../../utils/test-utils';
import '@testing-library/jest-dom';

const renderComponent = (props: FreeTrialProps) =>
  render(<FreeTrial {...props} />);

const defaultProps = {
  freeTrialHeader: 'Play thousands of puzzles with unlimited digital access',
  freeTrialSubheadline: 'Brain train, read and comment free for one month',
  url: 'https://www.newskit.co.uk/',
  title: 'Start your free trial'
};

describe('FreeTrial', () => {
  it('should render freeTrial banner component', () => {
    const { asFragment } = renderComponent(defaultProps);
    expect(asFragment()).toMatchSnapshot();
  });
});
