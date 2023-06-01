import React from 'react';
import { BreakoutSection } from '../index';
import { render } from '../../../../utils/test-utils';
import '@testing-library/jest-dom';

describe('BreakoutSection', () => {
  it('should render Breakout section', () => {
    const { asFragment } = render(<BreakoutSection />);
    expect(asFragment()).toMatchSnapshot();
  });
});
