import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '../../../../utils/test-utils';
import { CommentCard, CommentCardProps } from '..';

const renderComponent = (props: CommentCardProps) =>
  render(<CommentCard {...props} />);

const defaultProps = {
  images: {
    alt: '',
    caption: 'Caption',
    crops: [
      {
        url: 'https://www.thetimes.co.uk/d/img/profile/deborah-haynes.jpg',
        ratio: '3:2'
      },
      {
        url:
          'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fbde50bea-247f-11ee-8c1b-d5d52b458fbd.jpg?crop=2497%2C1405%2C1041%2C169',
        ratio: '16:9'
      },
      {
        url: 'https://www.thetimes.co.uk/d/img/profile/deborah-haynes.jpg',
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
  byline: 'Journalist name',
  headline: 'Quote text',
  href: '/#'
};

it('should render component to match snapshot', () => {
  const { asFragment } = renderComponent(defaultProps);

  expect(asFragment).toMatchSnapshot();
});

it('should render the correct text, with Heading', () => {
  renderComponent(defaultProps);

  const heading = screen.getByText('Journalist name');
  const quote = screen.getByText('Quote text');

  expect(heading).toBeInTheDocument();
  expect(quote).toBeInTheDocument();
});

it('should render the flag if available', () => {
  renderComponent({ ...defaultProps, flag: '3 mins ago' });
  const flag = screen.getByText('3 mins ago');
  expect(flag).toBeInTheDocument();
});
it('should not render the flag if it is not available', () => {
  renderComponent(defaultProps);
  expect(screen.queryByText('3 mins ago')).toBeFalsy();
});
it('should render the correct image', () => {
  renderComponent(defaultProps);

  const image = screen.getByRole('img');

  expect(image).toHaveAttribute(
    'src',
    'https://www.thetimes.co.uk/d/img/profile/deborah-haynes.jpg'
  );
  expect(image).toHaveAttribute('alt', 'Journalist name');
});

it('should render the correct text, without Heading', () => {
  renderComponent({
    images: {
      alt: '',
      caption: 'Caption',
      crops: [
        {
          url: 'https://www.thetimes.co.uk/d/img/profile/deborah-haynes.jpg',
          ratio: '3:2'
        },
        {
          url:
            'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fbde50bea-247f-11ee-8c1b-d5d52b458fbd.jpg?crop=2497%2C1405%2C1041%2C169',
          ratio: '16:9'
        },
        {
          url: 'https://www.thetimes.co.uk/d/img/profile/deborah-haynes.jpg',
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
    byline: 'Journalist name',
    headline: 'Quote text',
    href: '/'
  });

  const heading = screen.queryByText('Heading text');
  const quote = screen.getByText('Quote text');

  expect(heading).toBeNull();
  expect(quote).toBeInTheDocument();
});
