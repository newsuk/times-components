import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '../../../utils/test-utils';
import { ArticleListItem } from '../index';
import {
  image,
  color,
  alt,
  title,
  url,
  articleType,
  timeToRead
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
        color={color}
        alt={alt || title}
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
        color={color}
        alt={alt || title}
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
        color={color}
        alt={alt || title}
      />
    );
    const articleListUrl = getAllByTestId('article-ListItem')[0];
    expect(articleListUrl).toHaveAttribute(
      'href',
      '/article/harry-and-meghan-s-new-project-to-make-boys-less-toxic-nk5n3h70m'
    );
  });

  it('items should render ALT text', () => {
    render(
      <ArticleListItem
        title={title}
        timeToRead={timeToRead}
        articleType={articleType}
        image={image}
        url={url}
        color={color}
        alt={alt || title}
      />
    );
    const articleListUrl = screen.getByAltText('This is ALT Text');
    expect(articleListUrl).toHaveAttribute('alt', 'This is ALT Text');
  });

  it('items should render TITLE text if ALT is missing', () => {
    render(
      <ArticleListItem
        title={title}
        timeToRead={timeToRead}
        articleType={articleType}
        image={image}
        url={url}
        color={color}
        alt={title}
      />
    );
    const articleListUrl = screen.getByAltText("Harry & Meghan's New Project?");
    expect(articleListUrl).toHaveAttribute(
      'alt',
      "Harry & Meghan's New Project?"
    );
  });
});
