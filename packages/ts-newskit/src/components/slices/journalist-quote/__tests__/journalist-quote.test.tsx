import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '../../../../utils/test-utils';
import { JournalistQuote, JournalistQuoteProps } from '..';

const renderComponent = (props: JournalistQuoteProps) =>
  render(<JournalistQuote {...props} />);

const defaultProps = {
  journalist: {
    name: 'Journalist name',
    image: 'https://www.thetimes.co.uk/d/img/profile/deborah-haynes.jpg'
  },
  heading: 'Heading text',
  quote: 'Quote text',
  sectionColour: '#008347',
  textColour: '#222222'
};

it('should render component to match snapshot', () => {
  const { asFragment } = renderComponent(defaultProps);

  expect(asFragment).toMatchSnapshot();
});

it('should render the correct text, with Heading', () => {
  renderComponent(defaultProps);

  const heading = screen.getByText('Heading text');
  const quote = screen.getByText('Quote text');

  expect(heading).toBeInTheDocument();
  expect(quote).toBeInTheDocument();
});

it('should render the correct journalist name and colour', () => {
  renderComponent(defaultProps);

  const journalist = screen.getByText('Journalist name');

  expect(journalist).toBeInTheDocument();
  expect(journalist).toHaveStyle({
    color: '#008347'
  });
});

it('should render the correct text, without Heading', () => {
  renderComponent({
    journalist: {
      name: 'Journalist name',
      image: 'https://www.thetimes.co.uk/d/img/profile/deborah-haynes.jpg'
    },
    quote: 'Quote text',
    sectionColour: '#008347',
    textColour: '#222222'
  });

  const heading = screen.queryByText('Heading text');
  const quote = screen.getByText('Quote text');

  expect(heading).toBeNull();
  expect(quote).toBeInTheDocument();
});
