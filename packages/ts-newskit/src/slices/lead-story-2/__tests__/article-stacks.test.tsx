import React from 'react';
import { render } from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import data from '../../fixtures/lead-story.json';
import { ArticleStack } from '../article-stacks';

jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('xl')
}));
const { horizontalArticles, verticalArticles } = data;

const renderComponent = (width?: string) =>
  render(
    <ArticleStack
      {...{ horizontalArticles, verticalArticles }}
      breakpoint="lg"
      horizontalArticleContentWidth={width}
    />
  );

describe('Render ArticleStack', () => {
  test('Slice matches snapshot with default width', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders with passed width', () => {
    const { asFragment } = renderComponent('100px');
    expect(asFragment()).toMatchSnapshot();
  });
});
