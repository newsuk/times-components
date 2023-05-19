import React from 'react';
import '@testing-library/jest-dom';
import { render } from '../../../../utils/test-utils';
import { puzzles } from '../fixtures/data.json';
import { PuzzleCard } from '../index';

const renderComponent = () => render(<PuzzleCard data={puzzles.list[0]} />);

describe('Puzzle Card', () => {
  it('should render Puzzle Card', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the puzzle card title', () => {
    const { getByText } = renderComponent();
    expect(getByText(puzzles.list[0].title)).toBeInTheDocument();
  });

  it('renders the puzzle card image placeholder', () => {
    const { getByTestId, queryByTestId } = renderComponent();
    const image = queryByTestId('puzzle-image');
    if (image) {
      expect(queryByTestId('puzzle-placeholder')).not.toBeInTheDocument();
    } else {
      const placeholder = getByTestId('puzzle-placeholder');
      expect(placeholder).toBeInTheDocument();
    }
  });
});
