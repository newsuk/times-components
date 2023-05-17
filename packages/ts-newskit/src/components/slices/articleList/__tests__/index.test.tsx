import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '../../../../utils/test-utils';
import { ArticleListItem, ArticleListItemProps } from '../index';

const renderComponent = (props: ArticleListItemProps) =>
  render(<ArticleListItem {...props} />);

const defaultProps = {
  image: {
    src:
      '//www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F3c293bea-c74a-11ed-84e7-e2697ffed9a9.jpg?crop=2721%2C1531%2C216%2C63',
    alt: 'This is ALT Text',
    credit: 'Credit'
  },
  title: "Harry & Meghan's New Project?",
  url:
    '/article/harry-and-meghan-s-new-project-to-make-boys-less-toxic-nk5n3h70m',
  articleType: 'Review',
  timeToRead: '4 min read'
};

describe('Render Article List Item', () => {
  it('should render a snapshot', () => {
    const { asFragment } = renderComponent(defaultProps);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the component', () => {
    const { getByText } = renderComponent(defaultProps);
    const getArticleListItem = getByText("Harry & Meghan's New Project?");
    expect(getArticleListItem).toBeInTheDocument();
  });

  it('items should have link with href', () => {
    const { getByText } = renderComponent(defaultProps);
    const getArticleListItem = getByText("Harry & Meghan's New Project?");

    expect(getArticleListItem.closest('a')).toHaveAttribute(
      'href',
      '/article/harry-and-meghan-s-new-project-to-make-boys-less-toxic-nk5n3h70m'
    );
  });

  it('items should render ALT text', () => {
    renderComponent(defaultProps);
    const articleListUrl = screen.getByAltText('This is ALT Text');
    expect(articleListUrl).toHaveAttribute('alt', 'This is ALT Text');
  });

  it('items should render TITLE text if ALT is missing', () => {
    renderComponent({
      image: {
        src:
          '//www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F3c293bea-c74a-11ed-84e7-e2697ffed9a9.jpg?crop=2721%2C1531%2C216%2C63',
        alt: ''
      },
      title: "Harry & Meghan's New Project?",
      url:
        '/article/harry-and-meghan-s-new-project-to-make-boys-less-toxic-nk5n3h70m',
      articleType: 'Review',
      timeToRead: '4 min read'
    });
    const articleListUrl = screen.getByAltText("Harry & Meghan's New Project?");
    expect(articleListUrl).toHaveAttribute(
      'alt',
      "Harry & Meghan's New Project?"
    );
  });

  it('it should not render `timeToRead` if not passed', () => {
    renderComponent({ ...defaultProps, timeToRead: '', articleType: '' });

    const articleType = screen.queryByText('Review');
    const timeToRead = screen.queryByText('4 min read');

    expect(articleType).not.toBeInTheDocument();
    expect(timeToRead).not.toBeInTheDocument();
  });
});

describe('Render Article List Item with hidden image', () => {
  it('items should render without image', () => {
    renderComponent(defaultProps);
    const articleImage = screen.getByRole('img');
    const credit = screen.queryByText('Credit');

    expect(articleImage).toBeInTheDocument();
    expect(credit).toHaveTextContent('Credit');
  });

  it('items should render without image', () => {
    renderComponent({ ...defaultProps, hideImage: true });
    const articleImage = screen.queryByRole('img');
    const credit = screen.queryByText('Credit');

    expect(articleImage).toBeNull();
    expect(credit).toBeNull();
  });
});
