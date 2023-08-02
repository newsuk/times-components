import React from 'react';
import { useBreakpointKey } from 'newskit';
import { render, screen } from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import { ContentBucket2 } from '..';
import data from '../../fixtures/data.json';

jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('xl')
}));

afterAll(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});
const { articles } = data;
const renderComponent = async () =>
  render(<ContentBucket2 {...{ articles }} />);

describe('Render Content Bucket 2 Slice', () => {
  test('Slice matches snapshot at `lg` breakpoint', async () => {
    (useBreakpointKey as any).mockReturnValue('lg');
    const { asFragment } = await renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  test('Slice matches snapshot at `xs` breakpoint', async () => {
    (useBreakpointKey as any).mockReturnValue('xs');
    const { asFragment } = await renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Content Bucket 2 Articles list above `md` breakpoint', () => {
  (useBreakpointKey as any).mockReturnValue('md');
  renderComponent();

  const articleContainer = screen.getByTestId('article-container');

  const articleItem1 = articleContainer.firstChild;
  const articleItem4 = articleContainer.lastChild;

  test('articleBorder', () => {
    expect(articleItem1!.nextSibling).toHaveAttribute('data-testid', 'divider');
    expect(articleItem4!.previousSibling).toHaveAttribute(
      'data-testid',
      'divider'
    );
    expect(articleItem4!.nextSibling).toBeNull();
    expect(articleItem1!.nextSibling).toHaveStyle({
      borderColor: '#e4e4e4',
      borderStyle: 'solid'
    });
  });
});

describe('Content Bucket 2 Articles list below `md` breakpoint', () => {
  beforeEach(async () => {
    (useBreakpointKey as any).mockReturnValue('xs');
    await renderComponent();
  });

  test('articleBorder', () => {
    const articleContainer = screen.getByTestId('article-container');

    const articleItem1 = articleContainer.firstElementChild;
    const articleItem4 = articleContainer.lastElementChild;

    expect(articleItem1!.getElementsByTagName('hr').length).toBe(0);
    expect(articleItem4!.getElementsByTagName('hr').length).toBe(1);
  });

  test('article images', () => {
    const articleContainer = screen.getByTestId('article-container');

    const articleItem1 = articleContainer.firstElementChild;
    const articleItem4 = articleContainer.lastElementChild;

    expect(articleItem1!.getElementsByTagName('img').length).toBe(1);

    expect(articleItem4!.getElementsByTagName('img').length).toBe(0);

    expect(articleItem4!.getElementsByTagName('hr').length).toBe(1);
  });
});
