import React from 'react';
import { useBreakpointKey } from 'newskit';
import { render, screen } from '../../../components/utils/test-utils';
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

  const articleItem1 = screen.getByText(data.articles[0].title).closest('div');
  const articleItem3 = screen.getByText(data.articles[2].title).closest('div');
  const articleItem4 = screen.getByText(data.articles[3].title).closest('div');

  test('articleBorder', () => {
    expect(articleItem1!.nextSibling).toHaveAttribute('data-testid', 'divider');
    expect(articleItem3!.nextSibling).toHaveAttribute('data-testid', 'divider');
    expect(articleItem4!.nextSibling).toBeNull();
  });

  test('articleTopBorder', () => {
    expect(articleItem1!.firstChild).not.toHaveAttribute(
      'data-testid',
      'divider'
    );
    expect(articleItem3!.firstChild).not.toHaveAttribute(
      'data-testid',
      'divider'
    );
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
    const articleItem4 = screen
      .getByText(data.articles[3].title)
      .closest('div');

    expect(articleItem1!.nextSibling).not.toHaveAttribute(
      'data-testid',
      'divider'
    );
    expect(articleItem3!.nextSibling).not.toHaveAttribute(
      'data-testid',
      'divider'
    );
    expect(articleItem4!.nextSibling).toBeNull();
  });

  test('articleTopBorder', () => {
    const articleItem1 = screen
      .getByText(data.articles[0].title)
      .closest('div');
    const articleItem3 = screen
      .getByText(data.articles[2].title)
      .closest('div');

    expect(articleItem1!.firstChild).not.toHaveAttribute(
      'data-testid',
      'divider'
    );
    expect(articleItem3!.firstChild).toHaveAttribute('data-testid', 'divider');
  });

  test('article images', () => {
    const articleItem1 = screen
      .getByText(data.articles[0].title)
      .closest('div');
    const articleItem3 = screen
      .getByText(data.articles[2].title)
      .closest('div');

    expect(articleItem1!.getElementsByTagName('img').length).toBe(1);
    expect(articleItem3!.getElementsByTagName('img').length).toBe(0);
  });
});
