import React from 'react';
import { render } from '../../../../utils/test-utils';
import { CardsContainer, CardsContainerProps } from '../index';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { puzzleGame } from './../fixtures/puzzleGame.json';
import { PuzzleScrollClickHandlerType } from '../types';

const mockClickHandler = jest.fn();

const defaultProps = {
  cards: Array(8).fill(puzzleGame),
  title: 'Crosswords',
  seeAllLink: 'https://newskit.co.uk/components'
};

const renderComponent = (
  theProps: CardsContainerProps,
  clickHandler: PuzzleScrollClickHandlerType
) =>
  render(<CardsContainer cardsProps={theProps} clickHandler={clickHandler} />);

describe('CardsContainer tests', () => {
  it('should render a seeAllLink', () => {
    const { getAllByTestId } = renderComponent(defaultProps, mockClickHandler);

    const seeAllLink = getAllByTestId('card-controller-see-all-link')[0];
    expect(seeAllLink).toBeInTheDocument();
    expect(seeAllLink).toHaveAttribute(
      'href',
      'https://newskit.co.uk/components'
    );
  });

  it('should NOT be rendering a seeAllLink', () => {
    const { getAllByTestId } = renderComponent(
      { ...defaultProps, seeAllLink: undefined },
      mockClickHandler
    );

    const seeAllLink = getAllByTestId('no-see-all-link')[0];
    expect(seeAllLink).toBeInTheDocument();
  });

  it('should render a snapshot without scroller', () => {
    const { asFragment } = renderComponent(defaultProps, mockClickHandler);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a snapshot without scroller and without dash divider', () => {
    const { asFragment } = renderComponent(
      { ...defaultProps, isDashHidden: true },
      mockClickHandler
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a snapshot with scroller', () => {
    const { asFragment } = renderComponent(
      { ...defaultProps, isScrollable: true },
      mockClickHandler
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should scroll right once scroll right control is clicked', () => {
    const { getByTestId } = renderComponent(
      { ...defaultProps, isScrollable: true },
      mockClickHandler
    );

    const scrollContainer = getByTestId('scroll-container');
    const btnScrollRight = getByTestId('scroll-right');

    fireEvent.click(btnScrollRight);
    expect(scrollContainer.scrollLeft).toBeGreaterThan(0);
  });

  it('should scroll left once scroll left control is clicked', () => {
    const { getByTestId } = renderComponent(
      { ...defaultProps, isScrollable: true, cards: Array(7).fill(puzzleGame) },
      mockClickHandler
    );

    const scrollContainer = getByTestId('scroll-container');
    const btnScrollLeft = getByTestId('scroll-left');

    fireEvent.click(btnScrollLeft);
    expect(scrollContainer.scrollLeft).toBeLessThan(0);
  });
});
