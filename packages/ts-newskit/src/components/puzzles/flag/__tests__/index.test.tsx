import React from 'react';
import { render } from '../../../../utils/test-utils';
import { PuzzlesFlag } from '../index';
import '@testing-library/jest-dom';

describe('Flag test', () => {
  it('should render a snapshot', () => {
    const { asFragment } = render(<PuzzlesFlag status="COMPLETE" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a snapshot with label in progress', () => {
    const { asFragment } = render(<PuzzlesFlag status="IN PROGRESS" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
