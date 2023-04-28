import React from 'react';
import '@testing-library/jest-dom';
import { render } from '../../../../utils/test-utils';
import { puzzles } from '../fixtures/data.json';
import { PuzzleCard } from '../index';

describe('Puzzle Card', () => {
  it('should render Puzzle Card', () => {
    const { asFragment } = render(<PuzzleCard data={puzzles.list[0]} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the puzzle card title', () => {
    const { getByText } = render(<PuzzleCard data={puzzles.list[0]} />);
    expect(getByText(puzzles.list[0].title)).toBeInTheDocument();
  });

  it('renders the puzzle card image', () => {
    const { getByTestId } = render(<PuzzleCard data={puzzles.list[0]} />);
    const placeholder = getByTestId('puzzle-placeholder');
    expect(placeholder).toBeInTheDocument();
  });

  it('renders the puzzle card image URL', () => {
    const imageData = {
      ...puzzles.list[0].image,
      src: 'https://example.com/image.jpg'
    };
    const { getByAltText } = render(
      <PuzzleCard data={{ ...puzzles.list[0], image: imageData }} />
    );
    expect(getByAltText('Puzzle thumbnail')).toHaveAttribute(
      'src',
      'https://example.com/image.jpg'
    );
  });
});
