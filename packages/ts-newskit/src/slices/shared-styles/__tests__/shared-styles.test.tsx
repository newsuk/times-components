import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useBreakpointKey } from 'newskit';
import { BlockItem, StackItem } from '..';
import { TCThemeProvider } from '../../..';

jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('xl')
}));

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
  cleanup();
});

describe('StackItem', () => {
  const renderComponent = () =>
    render(
      <TCThemeProvider>
        <StackItem
          $width={{
            xs: '100%',
            sm: '480px',
            md: '720px',
            lg: '760px',
            xl: '840px'
          }}
        >
          StackItem
        </StackItem>
      </TCThemeProvider>
    );

  test('responsive widths at sm', () => {
    (useBreakpointKey as any).mockReturnValue('sm');

    renderComponent();
    const component = screen.getByText('StackItem');

    expect(component).toHaveStyle({
      width: '100%'
    });
  });
});

describe('BlockItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    cleanup();
  });

  const renderComponent = () =>
    render(
      <TCThemeProvider>
        <BlockItem
          $width={{
            xs: '100%',
            sm: '480px',
            md: '720px',
            lg: '760px',
            xl: '840px'
          }}
        >
          BlockItem
        </BlockItem>
      </TCThemeProvider>
    );

  test('responsive widths at sm', () => {
    (useBreakpointKey as any).mockReturnValue('sm');

    renderComponent();
    const component = screen.getByText('BlockItem');

    expect(component).toHaveStyle({
      width: '100%'
    });
  });
});
