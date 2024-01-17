import React from 'react';
import { HeroBanner, HeroBannerProps } from '../index';
import { render, fireEvent } from '../../../../utils/test-utils';
import '@testing-library/jest-dom';

const handleClick = jest.fn();

const defaultProps: HeroBannerProps = {
  puzzleName: 'Crossword',
  puzzleType: 'crossword',
  loginUrl:
    'https://login.thetimes.co.uk?gotoUrl=https://www.thetimes.co.uk/puzzles',
  onBtnClick: handleClick,
  onLinkClick: handleClick
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

    const title1 = getByText('Play the Times');
    const title2 = getByText('Crossword');
    expect(title1).toBeInTheDocument();
    expect(title2).toBeInTheDocument();

    const loginButton = getByText('Log In');
    expect(loginButton).toHaveAttribute(
      'href',
      'https://login.thetimes.co.uk?gotoUrl=https://www.thetimes.co.uk/puzzles'
    );
  });

  it('triggers onBtnClick function when clicked', () => {
    const { getByText } = renderComponent(defaultProps);
    const component = getByText('Subscribe');

    fireEvent.click(component);

    expect(handleClick).toHaveBeenCalled();
  });

  it('triggers onLinkClick function when clicked', () => {
    const { getByText } = renderComponent(defaultProps);
    const component = getByText('Log In');

    fireEvent.click(component);

    expect(handleClick).toHaveBeenCalled();
  });

  it('renders Sudoku icon when puzzleType is sudoku', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      puzzleType: 'sudoku'
    });

    const sudokuIcon = getByTestId('sudoku-icon');
    expect(sudokuIcon).toBeInTheDocument();
  });

  it('renders Word Puzzles icon when puzzleType is word-puzzles', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      puzzleType: 'word-puzzles'
    });

    const wordpuzzlesIcon = getByTestId('wordpuzzles-icon');
    expect(wordpuzzlesIcon).toBeInTheDocument();
  });

  it('renders Numbers and Logic icon when puzzleType is numbers-and-logic', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      puzzleType: 'numbers-and-logic'
    });

    const numberslogicIcon = getByTestId('numberslogic-icon');
    expect(numberslogicIcon).toBeInTheDocument();
  });

  it('renders Quizzes and Teasers icon when puzzleType is quizzes-and-teasers', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      puzzleType: 'quizzes-and-teasers'
    });

    const quizzesandteasersIcon = getByTestId('quizzes-and-teasers-icon');
    expect(quizzesandteasersIcon).toBeInTheDocument();
  });

  it('renders Board and CardGames icon when puzzleType is board-and-card-games', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      puzzleType: 'board-and-card-games'
    });

    const boardandcardgamesIcon = getByTestId('board-and-card-games-icon');
    expect(boardandcardgamesIcon).toBeInTheDocument();
  });
});
