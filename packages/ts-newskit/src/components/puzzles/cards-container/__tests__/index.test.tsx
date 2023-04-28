import React from 'react';
import { render } from '../../../../utils/test-utils';
import { CardsContainer } from '../index';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { puzzleGame } from './../fixtures/puzzleGame.json';

describe('CardsContainer tests', () => {
  it('should render a snapshot without scroller', () => {
    const { asFragment } = render(
      <CardsContainer
        cards={Array(8).fill(puzzleGame)}
        title="Crosswords"
        seeAllLink="https://newskit.co.uk/components"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render a snapshot with scroller', () => {
    const { asFragment } = render(
      <CardsContainer
        cards={Array(8).fill(puzzleGame)}
        title="Crosswords"
        seeAllLink="https://newskit.co.uk/components"
        isScrollable={true}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should scroll right once scroll right control is clicked', () => {
    const { getByTestId } = render(
      <CardsContainer
        cards={Array(7).fill(puzzleGame)}
        title="Crosswords"
        seeAllLink="https://newskit.co.uk/components"
        isScrollable={true}
      />
    );
    const scrollContainer = getByTestId('scroll-container');
    const btnScrollRight = getByTestId('scroll-right');

    fireEvent.click(btnScrollRight);
    expect(scrollContainer.scrollLeft).toBeGreaterThan(0);
  });
  it('should scroll left once scroll left control is clicked', () => {
    const { getByTestId } = render(
      <CardsContainer
        cards={Array(7).fill(puzzleGame)}
        title="Crosswords"
        seeAllLink="https://newskit.co.uk/components"
        isScrollable={true}
      />
    );
    const scrollContainer = getByTestId('scroll-container');
    const btnScrollLeft = getByTestId('scroll-left');

    fireEvent.click(btnScrollLeft);
    expect(scrollContainer.scrollLeft).toBeLessThan(0);
  });
});
