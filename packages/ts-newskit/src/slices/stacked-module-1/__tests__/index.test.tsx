import React from 'react';
import { useBreakpointKey } from 'newskit';
import { render } from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import { StackModule1 } from '../index';
import { stackedModule1Articles } from '../../fixtures/data.json';

jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('xl')
}));

const renderComponent = () =>
  render(<StackModule1 articles={stackedModule1Articles} />);

describe('Render StackModule 1 Slice', () => {
  test('Slice matches snapshot', () => {
    (useBreakpointKey as any).mockReturnValue('xl');

    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
  test('modifies articles correctly when breakpointKey is "md"', () => {
    (useBreakpointKey as any).mockReturnValue('md');
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
  test('modifies articles correctly when breakpointKey is "xs"', () => {
    (useBreakpointKey as any).mockReturnValue('xs');
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
  test('modifies articles correctly when breakpointKey is "sm"', () => {
    (useBreakpointKey as any).mockReturnValue('sm');
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});
