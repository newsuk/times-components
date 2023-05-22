import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '../../../../utils/test-utils';
import { Article, ArticleProps } from '../index';
import { useBreakpointKey } from 'newskit';

jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('xs')
}));

const renderComponent = (props: ArticleProps) => render(<Article {...props} />);

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
  tag: {
    label: 'Review',
    href: '/'
  },
  flag: '4 min read',
  imageRight: false,
  hideImage: false
};

describe('Render Article List Item', () => {
  it('should render a snapshot', () => {
    const { asFragment } = renderComponent(defaultProps);
    expect(asFragment()).toMatchSnapshot();
  });

  it('items should render without margin', () => {
    (useBreakpointKey as any).mockReturnValue('xl');
    const { asFragment } = renderComponent({
      ...defaultProps,
      imageRight: true
    });
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
      tag: {
        label: 'Review',
        href: '/'
      },
      flag: '4 min read'
    });
    const articleListUrl = screen.getByAltText("Harry & Meghan's New Project?");
    expect(articleListUrl).toHaveAttribute(
      'alt',
      "Harry & Meghan's New Project?"
    );
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
  it('items should render with divider', () => {
    renderComponent({
      ...defaultProps,
      isFullWidth: true,
      hasTopBorder: true,
      hideImage: true
    });
    const articleDivider = screen.getAllByTestId('divider')[0];
    expect(articleDivider).toBeInTheDocument();
  });
  it('items should render the divider with right margin', () => {
    renderComponent({
      ...defaultProps,
      isFullWidth: true,
      hasTopBorder: true,
      hideImage: false
    });
    const articleDivider = screen.getAllByTestId('divider')[1];
    expect(articleDivider.style.marginBottom).toBe('');
  });
});
