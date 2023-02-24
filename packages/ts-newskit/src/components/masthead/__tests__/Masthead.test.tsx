import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import EditionMasthead from '../index';
import { useBreakpointKey } from 'newskit';
jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('xl')
}));

describe('EditionMasthead', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render The Times masthead', () => {
    (useBreakpointKey as any).mockReturnValue('md');
    const { asFragment } = render(
      <EditionMasthead
        isSunday={false}
        todaysDate="Wed Feb 22 2023 00:01:00 GMT+0000 (Greenwich Mean Time)"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render The Sunday Times masthead', () => {
    (useBreakpointKey as any).mockReturnValue('md');
    const { asFragment } = render(
      <EditionMasthead
        isSunday={true}
        todaysDate="Sun Feb 26 2023 00:01:00 GMT+0000 (Greenwich Mean Time)"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render date correctly', () => {
    (useBreakpointKey as any).mockReturnValue('md');
    const { getByText } = render(
      <EditionMasthead
        isSunday={false}
        todaysDate="Wed Feb 22 2023 00:01:00 GMT+0000 (Greenwich Mean Time)"
      />
    );
    const date = getByText('Wednesday February 22 2023');
    expect(date).toBeInTheDocument();
  });
});
