import React from 'react';
import { FreeTrail, FreeTrailProps } from '../index';
import { render } from '../../../../utils/test-utils';
import '@testing-library/jest-dom';

const renderComponent = (props: FreeTrailProps) =>
  render(<FreeTrail {...props} />);

const defaultProps = {
  freeTrailHeader: 'Play thousands of puzzles with unlimited digital access',
  freeTrailSubheadline: 'Brain train, read and comment free for one month',
  url: 'https://www.newskit.co.uk/',
  title: 'Start your free trail'
};

describe('FreeTrail', () => {
  it('should render freeTrail banner component', () => {
    const { asFragment } = renderComponent(defaultProps);
    expect(asFragment()).toMatchSnapshot();
  });
});
