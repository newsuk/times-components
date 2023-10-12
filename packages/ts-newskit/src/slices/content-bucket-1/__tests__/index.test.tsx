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
  test('articleBorder render after odd numbered items', () => {
    renderComponent(<ContentBucket1 {...defaultProps} />, 'xl');
    const articleContainer = screen.getByTestId('article-container');

    const articleHR = articleContainer.lastElementChild;

    expect(articleHR).toHaveAttribute('data-testid', 'divider');
  });

  test("articleTopBorder renders correctly at 'xl' breakpoint", () => {
    renderComponent(<ContentBucket1 {...defaultProps} />, 'xl');
    const articleContainer = screen.getAllByTestId('article-container')[0];

    const articleItem1 = articleContainer.firstElementChild;

    expect(articleItem1!.getElementsByTagName('hr').length).toBe(1);
  });

  test("articleTopBorder renders correctly below 'lg' breakpoint", () => {
    renderComponent(<ContentBucket1 {...defaultProps} />, 'lg');
    const articleContainer = screen.getAllByTestId('article-container')[0];

    const articleItem1 = articleContainer.firstElementChild;

    expect(articleItem1!.nextSibling).toHaveAttribute('data-testid', 'divider');
  });

  test("articleTopBorder renders correctly at 'lg' breakpoint", () => {
    renderComponent(<ContentBucket1 {...defaultProps} />, 'lg');
    const articleContainer = screen.getAllByTestId('article-container')[0];

    const articleItem1 = articleContainer.firstElementChild;

    expect(articleItem1!.getElementsByTagName('hr').length).toBe(1);
  });
});
