import React from 'react';
import { BreakoutSection } from '../index';
import { breakoutItems } from '../fixtures/breakoutItems.json';
import { render } from '../../../../utils/test-utils';
import '@testing-library/jest-dom';

describe('BreakoutSection', () => {
  it('should render Breakout section', () => {
    const { asFragment } = render(<BreakoutSection data={breakoutItems} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
