import React from 'react';
import { useBreakpointKey } from 'newskit';
import { render, screen } from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import { ContentBucket1 } from '..';
import data from '../../fixtures/data.json';

jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('xl')
}));

afterAll(() => {
  jest.clearAllMocks();
});

const renderComponent = () => render(<ContentBucket1 {...data} />);

describe('Render Content Bucket 1 Slice', () => {
  test('Slice matches snapshot', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Content Bucket 1 Articles list ', () => {
  renderComponent();
  const articleItem1 = screen.getByText(data.articles[0].title).closest('div');
  const articleItem2 = screen.getByText(data.articles[1].title).closest('div');
  const articleItem3 = screen.getByText(data.articles[2].title).closest('div');

  test('articleBorder render after odd numbered items', () => {
    (useBreakpointKey as any).mockReturnValue('xl');

    expect(articleItem1!.nextSibling).toHaveAttribute('data-testid', 'divider');
    expect(articleItem2!.nextSibling).not.toHaveAttribute(
      'data-testid',
      'divider'
    );
    expect(articleItem3!.nextSibling).toHaveAttribute('data-testid', 'divider');
  });

  test("articleTopBorder renders correctly at 'xl' breakpoint", () => {
    (useBreakpointKey as any).mockReturnValue('xl');
    expect(articleItem1!.firstChild).not.toHaveAttribute(
      'data-testid',
      'divider'
    );
    expect(articleItem3!.firstChild).toHaveAttribute('data-testid', 'divider');
  });

  test("articleTopBorder renders correctly at 'lg' breakpoint", () => {
    (useBreakpointKey as any).mockReturnValue('lg');
    renderComponent();
    const articleItem1LG = screen
      .getByText(data.articles[0].title)
      .closest('div');
    const articleItem2LG = screen
      .getByText(data.articles[1].title)
      .closest('div');

    expect(articleItem1LG!.firstChild).not.toHaveAttribute(
      'data-testid',
      'divider'
    );
    expect(articleItem2LG!.firstChild).toHaveAttribute(
      'data-testid',
      'divider'
    );
  });
});
