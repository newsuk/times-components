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
  images: {
    alt: 'This is ALT Text',
    caption: '',
    crops: [
      {
        url:
          'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fbde50bea-247f-11ee-8c1b-d5d52b458fbd.jpg?crop=3844%2C2563%2C188%2C173',
        ratio: '3:2'
      },
      {
        url:
          'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fbde50bea-247f-11ee-8c1b-d5d52b458fbd.jpg?crop=2497%2C1405%2C1041%2C169',
        ratio: '16:9'
      },
      {
        url:
          'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fbde50bea-247f-11ee-8c1b-d5d52b458fbd.jpg?crop=2563%2C2563%2C828%2C173',
        ratio: '1:1'
      },
      {
        url:
          'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fbde50bea-247f-11ee-8c1b-d5d52b458fbd.jpg?crop=1708%2C2563%2C1256%2C173',
        ratio: '2:3'
      },
      {
        url:
          'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fbde50bea-247f-11ee-8c1b-d5d52b458fbd.jpg?crop=2050%2C2563%2C1085%2C173',
        ratio: '4:5'
      },
      {
        url:
          'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fbde50bea-247f-11ee-8c1b-d5d52b458fbd.jpg?crop=3203%2C2563%2C508%2C173',
        ratio: '5:4'
      }
    ]
  },
  headline: "Harry & Meghan's New Project?",
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
      images: {
        alt: '',
        caption: '',
        crops: [
          {
            url:
              'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fbde50bea-247f-11ee-8c1b-d5d52b458fbd.jpg?crop=3844%2C2563%2C188%2C173',
            ratio: '3:2'
          },
          {
            url:
              'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fbde50bea-247f-11ee-8c1b-d5d52b458fbd.jpg?crop=2497%2C1405%2C1041%2C169',
            ratio: '16:9'
          },
          {
            url:
              'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fbde50bea-247f-11ee-8c1b-d5d52b458fbd.jpg?crop=2563%2C2563%2C828%2C173',
            ratio: '1:1'
          },
          {
            url:
              'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fbde50bea-247f-11ee-8c1b-d5d52b458fbd.jpg?crop=1708%2C2563%2C1256%2C173',
            ratio: '2:3'
          },
          {
            url:
              'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fbde50bea-247f-11ee-8c1b-d5d52b458fbd.jpg?crop=2050%2C2563%2C1085%2C173',
            ratio: '4:5'
          },
          {
            url:
              'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fbde50bea-247f-11ee-8c1b-d5d52b458fbd.jpg?crop=3203%2C2563%2C508%2C173',
            ratio: '5:4'
          }
        ]
      },
      headline: "Harry & Meghan's New Project?",
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
    const caption = screen.queryByText('Caption');

    expect(articleImage).toBeInTheDocument();
    expect(caption).toBeNull();
  });

  it('items should render without image', () => {
    renderComponent({ ...defaultProps, hideImage: true });
    const articleImage = screen.queryByRole('img');
    const caption = screen.queryByText('Caption');

    expect(articleImage).toBeNull();
    expect(caption).toBeNull();
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
