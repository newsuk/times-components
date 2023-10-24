import React from 'react';
import { screen } from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import { ContentBucket1 } from '..';
import data from '../../fixtures/data.json';
import { renderComponent } from '../../../utils';

afterAll(() => {
  jest.clearAllMocks();
});
const mockClickHandler = jest.fn();

const defaultProps = {
  ...data,
  clickHandler: mockClickHandler
};

describe('Render Content Bucket 1 Slice', () => {
  test('Slice matches snapshot', () => {
    const { asFragment } = renderComponent(
      <ContentBucket1 {...defaultProps} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Slice matches snapshot for mobile', () => {
    const { asFragment } = renderComponent(
      <ContentBucket1 {...defaultProps} />,
      'sm'
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Content Bucket 1 Articles list ', () => {
  test("<ArticleDividerXL> renders in article-container at 'xl' breakpoint", () => {
    renderComponent(<ContentBucket1 {...defaultProps} />, 'xl');
    const articleContainer = screen.getByTestId('article-container-desktop');
    const articleBorder = articleContainer.querySelector(
      '[data-testid="article-stack-large-divider"]'
    );

    expect(articleBorder).toBeInTheDocument();
  });

  test("articleTopBorder renders correctly at 'xl' breakpoint", () => {
    renderComponent(<ContentBucket1 {...defaultProps} />, 'xl');
    const articleContainer = screen.getByTestId('article-container-desktop');
    const articleItem1 = articleContainer.firstElementChild;
    const articleItem4 = articleContainer!.lastElementChild!
      .previousElementSibling;

    expect(articleItem1!.getElementsByTagName('hr').length).toBe(2);
    expect(articleItem4!.getElementsByTagName('hr').length).toBe(3);
  });

  test("articleTopBorder renders correctly below 'lg' breakpoint", () => {
    renderComponent(<ContentBucket1 {...defaultProps} />, 'lg');
    const articleContainer = screen.getByTestId('article-container-desktop');
    const articleItem1 = articleContainer.firstElementChild;
    const articleBorder = articleContainer.querySelector(
      '[data-testid="article-stack-large-divider"]'
    );

    expect(articleBorder).not.toBeVisible();
    expect(articleItem1!.nextSibling).toHaveAttribute('data-testid', 'divider');
  });

  test("articleTopBorder renders correctly at 'lg' breakpoint", () => {
    renderComponent(<ContentBucket1 {...defaultProps} />, 'lg');
    const articleContainer = screen.getByTestId('article-container-desktop');
    const articleItem1 = articleContainer!.firstElementChild;
    const articleItem4 = articleContainer!.lastElementChild!
      .previousElementSibling;

    expect(articleItem1!.getElementsByTagName('hr').length).toBe(2);
    expect(articleItem4!.getElementsByTagName('hr').length).toBe(3);
  });
});
