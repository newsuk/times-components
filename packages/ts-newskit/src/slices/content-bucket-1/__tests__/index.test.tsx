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
const mockClickHandler = jest.fn();

const defaultProps = {
  ...data,
  clickHandler: mockClickHandler
};

const renderComponent = () => render(<ContentBucket1 {...defaultProps} />);

describe('Render Content Bucket 1 Slice', () => {
  test('Slice matches snapshot', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  test('Slice matches snapshot for mobile', () => {
    (useBreakpointKey as any).mockReturnValue('sm');
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Content Bucket 1 Articles list ', () => {
  test('articleBorder render after odd numbered items', () => {
    (useBreakpointKey as any).mockReturnValue('xl');
    renderComponent();
    const articleContainer = screen.getByTestId('article-container');

    const articleItem4 = articleContainer.lastElementChild!
      .previousElementSibling;
    const articleHR = articleContainer.lastElementChild;

    expect(articleHR).toHaveAttribute('data-testid', 'divider');
    expect(articleItem4!.getElementsByTagName('hr').length).toBe(2);
  });

  test("articleTopBorder renders correctly at 'xl' breakpoint", () => {
    (useBreakpointKey as any).mockReturnValue('xl');
    renderComponent();
    const articleContainer = screen.getByTestId('article-container');

    const articleItem1 = articleContainer.firstElementChild;
    const articleItem4 = articleContainer.lastElementChild!
      .previousElementSibling;

    expect(articleItem1!.getElementsByTagName('hr').length).toBe(1);
    expect(articleItem4!.getElementsByTagName('hr').length).toBe(2);
  });

  test("articleTopBorder renders correctly below 'lg' breakpoint", () => {
    (useBreakpointKey as any).mockReturnValue('md');
    renderComponent();
    const articleContainer = screen.getByTestId('article-container');

    const articleItem1 = articleContainer.firstElementChild;

    expect(articleItem1!.nextSibling).toHaveAttribute('data-testid', 'divider');
  });

  test("articleTopBorder renders correctly at 'lg' breakpoint", () => {
    (useBreakpointKey as any).mockReturnValue('lg');
    renderComponent();
    const articleContainer = screen.getByTestId('article-container');

    const articleItem1 = articleContainer.firstElementChild;
    const articleItem4 = articleContainer.lastElementChild;

    expect(articleItem1!.getElementsByTagName('hr').length).toBe(1);
    expect(articleItem4!.getElementsByTagName('hr').length).toBe(2);
  });
});
