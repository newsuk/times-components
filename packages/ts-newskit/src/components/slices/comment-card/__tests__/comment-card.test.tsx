import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '../../../../utils/test-utils';
import { CommentCard, CommentCardProps } from '..';
import { useBreakpointKey } from 'newskit';

jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('xs')
}));

const renderComponent = (props: CommentCardProps) =>
  render(<CommentCard {...props} />);

const defaultProps = {
  image: 'https://www.thetimes.co.uk/d/img/profile/deborah-haynes.jpg',
  heading: 'Journalist name',
  content: 'Quote text',
  href: '/#'
};

it('should render component to match snapshot', () => {
  const { asFragment } = renderComponent(defaultProps);

  expect(asFragment).toMatchSnapshot();
});

it('should render component to match snapshot', () => {
  (useBreakpointKey as any).mockReturnValue('md');

  const test = {
    ...defaultProps,
    isBucket1: true
  };

  const { asFragment } = renderComponent(test);
  expect(asFragment).toMatchSnapshot();
});

it('should render the correct text, with Heading', () => {
  renderComponent(defaultProps);

  const heading = screen.getByText('Journalist name');
  const quote = screen.getByText('Quote text');

  expect(heading).toBeInTheDocument();
  expect(quote).toBeInTheDocument();
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
    image: 'https://www.thetimes.co.uk/d/img/profile/deborah-haynes.jpg',
    heading: 'Journalist name',
    content: 'Quote text',
    href: '/'
  });

  const heading = screen.queryByText('Heading text');
  const quote = screen.getByText('Quote text');

  expect(heading).toBeNull();
  expect(quote).toBeInTheDocument();
});

it('should render Tag and Flag', () => {
  (useBreakpointKey as any).mockReturnValue('md');
  renderComponent({
    image: 'https://www.thetimes.co.uk/d/img/profile/deborah-haynes.jpg',
    heading: 'Journalist name',
    content: 'Quote text',
    href: '/',
    isBucket1: true,
    articleType: 'Tag',
    readingTime: 'Flag'
  });

  const heading = screen.queryByText('Tag');
  const quote = screen.getByText('Flag');
  expect(heading).toBeInTheDocument();
  expect(quote).toBeInTheDocument();
});
