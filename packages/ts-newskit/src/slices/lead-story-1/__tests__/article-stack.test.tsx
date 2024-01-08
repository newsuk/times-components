import React from 'react';
import { render, screen } from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import { articles } from '../../fixtures/lead-story.json';
import {
  ArticleStackLarge,
  ArticleStackSmall
} from '../../shared/article-stacks';
import { renderComponent } from '../../../utils';

const mockClickHandler = jest.fn();

const threeArticles = [articles[1], articles[2], articles[3]];

describe('Render Lead Story 1 Slice', () => {
  test('large Article Stack', () => {
    const { asFragment } = renderComponent(
      <ArticleStackLarge articles={articles} clickHandler={mockClickHandler} />,
      'xs'
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('small Article Stack', () => {
    const { asFragment } = render(
      <ArticleStackSmall
        articles={threeArticles}
        clickHandler={mockClickHandler}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("articleTopBorder renders correctly at 'xl' breakpoint", () => {
    renderComponent(
      <ArticleStackLarge articles={articles} clickHandler={mockClickHandler} />,
      'xl'
    );
    const articleContainer = screen.queryAllByTestId('article-container')[1];
    const articleItem4 = articleContainer.lastElementChild!
      .previousElementSibling;
    expect(articleItem4!.getElementsByTagName('hr').length).toBe(5);
  });

  test("articleTopBorder renders correctly below 'lg' breakpoint", () => {
    renderComponent(
      <ArticleStackLarge articles={articles} clickHandler={mockClickHandler} />,
      'lg'
    );
    const articleContainer = screen.queryAllByTestId('article-container')[1];
    const articleItem1 = articleContainer.firstElementChild;
    articleItem1 &&
      expect(
        articleItem1.querySelectorAll('[data-testid=divider]').length
      ).toBe(4);
  });

  test("articleTopBorder renders correctly at 'lg' breakpoint", () => {
    renderComponent(
      <ArticleStackLarge articles={articles} clickHandler={mockClickHandler} />,
      'lg'
    );
    const articleContainer = screen.queryAllByTestId('article-container')[1];
    const articleItem4 = articleContainer.lastElementChild;
    expect(articleItem4!.getElementsByTagName('hr').length).toBe(5);
  });
  test('renders article container with correct data-testid', () => {
    renderComponent(
      <ArticleStackLarge articles={articles} clickHandler={mockClickHandler} />,
      'xl'
    );
    const articleContainer = screen.queryAllByTestId('article-container')[1];
    expect(articleContainer).toBeInTheDocument();
  });
});
