import React from 'react';
import { render } from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import { articles } from '../../fixtures/lead-story.json';
import { ArticleStackLarge, ArticleStackSmall } from '../article-stack';

const threeArticles = [articles[1], articles[2], articles[3]];

const renderComponentLarge = () =>
  render(
    <ArticleStackLarge
      articles={articles}
      threeArticles={threeArticles}
      breakpoint={'xs'}
    />
  );

const renderComponentSmall = () =>
  render(
    <ArticleStackSmall
      articles={articles}
      breakpoint={'xs'}
      isLeadStory={false}
      hideImage={false}
      hasTopBorder={false}
    />
  );

describe('Render Lead Story 1 Slice', () => {
  test('Large Article Stack', () => {
    const { asFragment } = renderComponentLarge();
    expect(asFragment()).toMatchSnapshot();
  });

  test('Small Aricle Stack', () => {
    const { asFragment } = renderComponentSmall();
    expect(asFragment()).toMatchSnapshot();
  });
});
