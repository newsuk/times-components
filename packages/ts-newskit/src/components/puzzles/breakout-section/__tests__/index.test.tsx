import React from 'react';
import { BreakoutSection } from '../index';
import { render } from '../../../../utils/test-utils';
import { breakoutItems } from '../fixtures/breakoutItems.json';
import '@testing-library/jest-dom';

describe('BreakoutSection', () => {
  it('should render Breakout section', () => {
    const { asFragment } = render(<BreakoutSection items={breakoutItems} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
