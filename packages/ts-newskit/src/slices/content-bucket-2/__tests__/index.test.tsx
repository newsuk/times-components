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
const { section, articles } = data;
const renderComponent = async () =>
  render(<ContentBucket2 {...{ section, articles }} />);

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
    const articleItem1 = screen
      .getByText(data.articles[0].title)
      .closest('div');
    const articleItem3 = screen
      .getByText(data.articles[2].title)
      .closest('div');

    expect(articleItem1!.previousSibling).not.toHaveAttribute(
      'data-testid',
      'divider'
    );
    expect(articleItem3!.previousSibling).toHaveAttribute(
      'data-testid',
      'divider'
    );
    expect(articleItem3!.previousSibling).toHaveStyle({
      borderColor: '#01000d',
      borderStyle: 'dashed'
    });
  });

  test('article images', () => {
    const articleItem1 = screen
      .getByText(data.articles[0].title)
      .closest('div');
    const articleItem3 = screen
      .getByText(data.articles[2].title)
      .closest('div');

    expect(
      articleItem1!.previousElementSibling!.getElementsByTagName('img').length
    ).toBe(1);
    expect(articleItem3!.previousElementSibling).toHaveAttribute(
      'data-testid',
      'divider'
    );
  });
});
