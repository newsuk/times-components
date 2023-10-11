import React from 'react';
import { HeroBanner, HeroBannerProps } from '../index';
import { render } from '../../../../utils/test-utils';
import '@testing-library/jest-dom';

const defaultProps: HeroBannerProps = {
  puzzleName: 'Crossword',
  puzzleType: 'crossword',
  loginUrl:
    'https://login.thetimes.co.uk?gotoUrl=https://www.thetimes.co.uk/puzzles'
};

const renderComponent = (props: HeroBannerProps) =>
  render(<HeroBanner {...props} />);

describe('HeroBanner', () => {
  it('should render HeroBanner component', () => {
    const { asFragment } = renderComponent(defaultProps);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render HeroBanner with props', () => {
    const { getByText } = renderComponent(defaultProps);

    const title = getByText('Play the Times Crossword');
    expect(title).toBeInTheDocument();

    const loginButton = getByText('Log In');
    expect(loginButton).toHaveAttribute(
      'href',
      'https://login.thetimes.co.uk?gotoUrl=https://www.thetimes.co.uk/puzzles'
    );
  });

  it('should render the crossword icon', () => {
    const { getByTestId } = renderComponent(defaultProps);
    const crosswordIcon = getByTestId('crossword-icon');

    expect(crosswordIcon).toBeInTheDocument();
  });

  it('should render the sudoku icon', () => {
    const sudokuProps: HeroBannerProps = {
      puzzleName: 'Sudoku',
      puzzleType: 'sudoku',
      loginUrl:
        'https://login.thetimes.co.uk?gotoUrl=https://www.thetimes.co.uk/puzzles'
    };
    const { getByTestId } = renderComponent(sudokuProps);
    const sudokuIcon = getByTestId('sudoku-icon');

    expect(sudokuIcon).toBeInTheDocument();
  });

  it('should render the quizzes and teasers icon', () => {
    const quizzesteasersProps: HeroBannerProps = {
      puzzleName: 'Quizzes and Teasers',
      puzzleType: 'quizzes-and-teasers',
      loginUrl:
        'https://login.thetimes.co.uk?gotoUrl=https://www.thetimes.co.uk/puzzles'
    };
    const { getByTestId } = renderComponent(quizzesteasersProps);
    const quizzesteasersIcon = getByTestId('quizzesteasers-icon');

    expect(quizzesteasersIcon).toBeInTheDocument();
  });

  it('should render the word puzzles icon', () => {
    const wordpuzzlesProps: HeroBannerProps = {
      puzzleName: 'Word Puzzles',
      puzzleType: 'word-puzzles',
      loginUrl:
        'https://login.thetimes.co.uk?gotoUrl=https://www.thetimes.co.uk/puzzles'
    };
    const { getByTestId } = renderComponent(wordpuzzlesProps);
    const wordPuzzlesIcon = getByTestId('wordpuzzles-icon');

    expect(wordPuzzlesIcon).toBeInTheDocument();
  });

  it('should render the numbers and logic icon', () => {
    const numberlogicProps: HeroBannerProps = {
      puzzleName: 'Numbers and Logic',
      puzzleType: 'numbers-and-logic',
      loginUrl:
        'https://login.thetimes.co.uk?gotoUrl=https://www.thetimes.co.uk/puzzles'
    };
    const { getByTestId } = renderComponent(numberlogicProps);
    const numberlogicIcon = getByTestId('numberlogic-icon');

    expect(numberlogicIcon).toBeInTheDocument();
  });

  it('should render the board and card games icon', () => {
    const boardcardgamesProps: HeroBannerProps = {
      puzzleName: 'Board and Card Games',
      puzzleType: 'board-and-card-games',
      loginUrl:
        'https://login.thetimes.co.uk?gotoUrl=https://www.thetimes.co.uk/puzzles'
    };
    const { getByTestId } = renderComponent(boardcardgamesProps);
    const boardcardgamesIcon = getByTestId('boardcardgames-icon');

    expect(boardcardgamesIcon).toBeInTheDocument();
  });
});
