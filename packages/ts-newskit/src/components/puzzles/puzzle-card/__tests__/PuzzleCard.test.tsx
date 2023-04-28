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

  it('renders the puzzle card image placeholder', () => {
    const { getByTestId, queryByTestId } = render(
      <PuzzleCard data={puzzles.list[0]} />
    );
    const image = queryByTestId('puzzle-image');
    if (image) {
      expect(queryByTestId('puzzle-placeholder')).not.toBeInTheDocument();
    } else {
      const placeholder = getByTestId('puzzle-placeholder');
      expect(placeholder).toBeInTheDocument();
    }
  });

  it('renders the puzzle card image URL', () => {
    const imageUrl = 'https://example.com/image.jpg';
    const imageData = {
      ...puzzles.list[0].image,
      src: imageUrl
    };
    const imageAlt = puzzles.list[0].title || 'Puzzle thumbnail';
    const { getByRole } = render(
      <PuzzleCard data={{ ...puzzles.list[0], image: imageData }} />
    );
    expect(getByRole('img', { name: imageAlt })).toHaveAttribute(
      'src',
      'https://example.com/image.jpg'
    );
  });
});
