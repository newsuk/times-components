import React from 'react';
import '@testing-library/jest-dom';
import { render } from '../../utils/test-utils';
import { ArticleListItem } from '../index';
import {
  title,
  timeToRead,
  articleType,
  image,
  url
} from '../fixtures/data.json';

describe('Render Article List Item', () => {
  it('should render a snapshot', () => {
    const { asFragment } = render(
      <ArticleListItem
        title={title}
        timeToRead={timeToRead}
        articleType={articleType}
        image={image}
        url={url}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the component', () => {
    const { getByText } = render(
      <ArticleListItem
        title={title}
        timeToRead={timeToRead}
        articleType={articleType}
        image={image}
        url={url}
      />
    );
    const getArticleListItem = getByText("Harry & Meghan's New Project?");
    expect(getArticleListItem).toBeInTheDocument();
  });

  it('items should have link with href', () => {
    const { getAllByTestId } = render(
      <ArticleListItem
        title={title}
        timeToRead={timeToRead}
        articleType={articleType}
        image={image}
        url={url}
      />
    );
    const articleListUrl = getAllByTestId('article-ListItem')[0];
    expect(articleListUrl).toHaveAttribute(
      'href',
      '/article/harry-and-meghan-s-new-project-to-make-boys-less-toxic-nk5n3h70m'
    );
  });
});
