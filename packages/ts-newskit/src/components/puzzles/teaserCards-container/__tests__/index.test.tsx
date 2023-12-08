import React from 'react';
import { render } from '../../../../utils/test-utils';
import { TeaserCardsContainer } from '../index';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { Categories } from '../fixtures/data.json';

type PuzzleType =
  | 'Crosswords'
  | 'Sudokus'
  | 'Word Puzzles'
  | 'Numbers And Logic'
  | 'Quizzes And Teasers'
  | 'Board And Card Games';

describe('TeaserCardsContainer tests', () => {
  it('should render a snapshot', () => {
    const { asFragment } = render(
      <TeaserCardsContainer
        types={Categories as PuzzleType[]}
        title="Subscribe to access all of The Times puzzles"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should display the correct title', () => {
    const { getByRole } = render(
      <TeaserCardsContainer
        types={Categories as PuzzleType[]}
        title="Subscribe to access all of The Times puzzles"
      />
    );

    const titleBar = getByRole('heading', {
      name: 'Subscribe to access all of The Times puzzles',
      level: 2
    });
    expect(titleBar).toBeInTheDocument();
  });

  it('should navigate to the correct URL when clicked', () => {
    const { getAllByTestId } = render(
      <TeaserCardsContainer
        types={Categories as PuzzleType[]}
        title="Subscribe to access all of The Times puzzles"
      />
    );

    const cards = getAllByTestId('single-card');
    fireEvent.click(cards[0]);
  });
});
