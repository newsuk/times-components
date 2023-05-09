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
  const articleContainer = screen.getByTestId('article-container');

  const articleItem1 = articleContainer.firstElementChild;
  const articleItem4 = articleContainer.lastElementChild;

  test('articleBorder render after odd numbered items', () => {
    (useBreakpointKey as any).mockReturnValue('xl');

    expect(articleItem1!.nextSibling).toHaveAttribute('data-testid', 'divider');
    expect(articleItem4!.nextSibling).toBeNull();
    expect(articleItem4!.previousSibling).toHaveAttribute(
      'data-testid',
      'divider'
    );
  });

  test("articleTopBorder renders correctly at 'xl' breakpoint", () => {
    (useBreakpointKey as any).mockReturnValue('xl');
    expect(articleItem1!.getElementsByTagName('hr').length).toBe(1);
    expect(articleItem4!.getElementsByTagName('hr').length).toBe(2);
  });

  test("articleTopBorder renders correctly at 'lg' breakpoint", () => {
    (useBreakpointKey as any).mockReturnValue('lg');
    renderComponent();
    const articleContainerLG = screen.getByTestId('article-container');

    const articleItem1LG = articleContainerLG.firstChild;
    const articleItem4LG = articleContainerLG.lastChild;

    expect(articleItem1LG!.nextSibling).toHaveAttribute(
      'data-testid',
      'divider'
    );
    expect(articleItem4LG!.previousSibling).toHaveAttribute(
      'data-testid',
      'divider'
    );
    expect(articleItem4LG!.nextSibling).toBeNull();
    expect(articleItem1LG!.nextSibling).toHaveStyle({
      borderColor: '#e4e4e4',
      borderStyle: 'solid'
    });
  });
});
