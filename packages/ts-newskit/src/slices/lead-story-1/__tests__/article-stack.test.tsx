import React from 'react';
import { useBreakpointKey, BreakpointKeys } from 'newskit';
import { render, screen } from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import { articles } from '../../fixtures/lead-story.json';
import {
  ArticleStackLarge,
  ArticleStackSmall
} from '../../shared/article-stacks';

jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('xl')
}));

const mockClickHandler = jest.fn();

const threeArticles = [articles[1], articles[2], articles[3]];

const renderComponentLarge = (breakpoint: BreakpointKeys) =>
  render(
    <ArticleStackLarge
      articles={articles}
      breakpoint={breakpoint}
      clickHandler={mockClickHandler}
    />
  );

const renderComponentSmall = () =>
  render(
    <ArticleStackSmall
      articles={threeArticles}
      breakpoint={'xs'}
      isFullWidth={false}
      hideImage={false}
      hasTopBorder={true}
      clickHandler={mockClickHandler}
    />
  );

describe('Render Lead Story 1 Slice', () => {
  test('large Article Stack', () => {
    (useBreakpointKey as any).mockReturnValue('md');
    const { asFragment } = renderComponentLarge('xs');
    expect(asFragment()).toMatchSnapshot();
  });

  test('small Aricle Stack', () => {
    (useBreakpointKey as any).mockReturnValue('ld');
    const { asFragment } = renderComponentSmall();
    expect(asFragment()).toMatchSnapshot();
  });

  test("articleTopBorder renders correctly at 'xl' breakpoint", () => {
    (useBreakpointKey as any).mockReturnValue('xl');
    renderComponentLarge('xl');
    const articleContainer = screen.getByTestId('article-container');
    const articleItem4 = articleContainer.lastElementChild!
      .previousElementSibling;
    expect(articleItem4!.getElementsByTagName('hr').length).toBe(2);
  });

  test("articleTopBorder renders correctly below 'lg' breakpoint", () => {
    (useBreakpointKey as any).mockReturnValue('md');
    renderComponentLarge('md');
    const articleContainer = screen.getByTestId('article-container');
    const articleItem1 = articleContainer.firstElementChild;
    expect(articleItem1!.nextSibling).toHaveAttribute('data-testid', 'divider');
  });

  test("articleTopBorder renders correctly at 'lg' breakpoint", () => {
    (useBreakpointKey as any).mockReturnValue('lg');
    renderComponentLarge('lg');
    const articleContainer = screen.getByTestId('article-container');
    const articleItem4 = articleContainer.lastElementChild;
    expect(articleItem4!.getElementsByTagName('hr').length).toBe(3);
  });
  test('renders article container with correct data-testid', () => {
    (useBreakpointKey as any).mockReturnValue('xl');
    renderComponentLarge('xl');
    const articleContainer = screen.getByTestId('article-container');
    expect(articleContainer).toBeInTheDocument();
  });
});
