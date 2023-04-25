import React from 'react';
import { render } from '../../../utils/test-utils';
import { puzzles } from '../fixtures/data.json';
import '@testing-library/jest-dom';

import { PuzzleCard } from '../index';

describe('Puzzle Card', () => {
  it('should render Puzzle Card', () => {
    const { asFragment } = render(<PuzzleCard data={{ list: puzzles.list }} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the puzzle card title', () => {
    const { getByText } = render(<PuzzleCard data={{ list: puzzles.list }} />);
    expect(getByText(puzzles.list[0].title)).toBeInTheDocument();
  });
});
