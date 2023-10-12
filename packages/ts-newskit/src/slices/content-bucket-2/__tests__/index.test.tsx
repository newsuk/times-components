import React from 'react';
import { screen } from '../../../utils/test-utils';
import { renderComponent } from '../../../utils';
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

const mockClickHandler = jest.fn();

const defaultProps = {
  ...data,
  clickHandler: mockClickHandler
};

describe('Render Content Bucket 2 Slice', () => {
  test('Slice matches snapshot at `lg` breakpoint', () => {
    const { asFragment } = renderComponent(
      <ContentBucket2 {...defaultProps} />,
      'lg'
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Slice matches snapshot at `xs` breakpoint', async () => {
    const { asFragment } = renderComponent(
      <ContentBucket2 {...defaultProps} />,
      'xs'
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Content Bucket 2 Articles list above `md` breakpoint', () => {
  renderComponent(
    <ContentBucket2 {...defaultProps} />,
    'md'
  );

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
    renderComponent(
      <ContentBucket2 {...defaultProps} />,
      'xs'
    );
  });

  test('articleBorder', () => {
    const articleContainer = screen.getByTestId('article-container');

    const articleItem1 = articleContainer.firstElementChild!.firstElementChild;
    const articleItem4 = articleContainer.lastElementChild!.firstElementChild;

    expect(articleItem1!.getElementsByTagName('hr').length).toBe(1);
    expect(articleItem4!.getElementsByTagName('hr').length).toBe(2);
  });

  test('article images', () => {
    const articleContainer = screen.getByTestId('article-container');

    const articleItem1 = articleContainer.firstElementChild!.firstElementChild;
    const articleItem4 = articleContainer.lastElementChild!.firstElementChild;

    expect(articleItem1!.getElementsByTagName('img').length).toBe(1);
    expect(articleItem4!.getElementsByTagName('img').length).toBe(0);
    expect(articleItem4!.getElementsByTagName('hr').length).toBe(2);
  });
});
