import React from 'react';
import { screen } from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import { ContentBucket3 } from '..';
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

describe('Render Content Bucket 3 Slice', () => {
  test('Slice matches snapshot', () => {
    const { asFragment } = renderComponent(
      <ContentBucket3 {...defaultProps} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Slice matches snapshot for mobile', () => {
    const { asFragment } = renderComponent(
      <ContentBucket3 {...defaultProps} />,
      'sm'
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Content Bucket 3 Articles list ', () => {
  test('articleBorder render after odd numbered items', () => {
    renderComponent(<ContentBucket3 {...defaultProps} />, 'xl');
    const articleContainer = screen.getByTestId('article-container');

    const articleItem4 = articleContainer.lastElementChild!
      .previousElementSibling;
    const articleHR = articleContainer.lastElementChild;

    expect(articleHR).toHaveAttribute('data-testid', 'divider');
    expect(articleItem4!.getElementsByTagName('hr').length).toBe(2);
  });

  test("articleTopBorder renders correctly at 'xl' breakpoint", () => {
    renderComponent(<ContentBucket3 {...defaultProps} />, 'xl');
    const articleContainer = screen.getByTestId('article-container');

    const articleItem1 = articleContainer.firstElementChild;
    const articleItem4 = articleContainer.lastElementChild!
      .previousElementSibling;

    expect(articleItem1!.getElementsByTagName('hr').length).toBe(1);
    expect(articleItem4!.getElementsByTagName('hr').length).toBe(2);
  });

  test("articleTopBorder renders correctly below 'lg' breakpoint", () => {
    renderComponent(<ContentBucket3 {...defaultProps} />, 'md');
    const articleContainer = screen.getByTestId('article-container');

    const articleItem1 = articleContainer.firstElementChild;

    expect(articleItem1!.nextSibling).toHaveAttribute('data-testid', 'divider');
  });

  test("articleTopBorder renders correctly at 'lg' breakpoint", () => {
    renderComponent(<ContentBucket3 {...defaultProps} />, 'lg');
    const articleContainer = screen.getByTestId('article-container');

    const articleItem1 = articleContainer.firstElementChild;
    const articleItem4 = articleContainer.lastElementChild;

    expect(articleItem1!.getElementsByTagName('hr').length).toBe(1);
    expect(articleItem4!.getElementsByTagName('hr').length).toBe(2);
  });
});
