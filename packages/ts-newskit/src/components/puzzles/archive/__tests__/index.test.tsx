import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../utils/test-utils';
import { Archive } from '../index';
import { corsswordsArchive } from '../fixtures/corsswordsArchive.json';
import { sudokuArchive } from '../fixtures/sudokuArchive.json';

describe('Render Archive', () => {
  it('should render a snapshot', () => {
    const { asFragment } = render(<Archive data={corsswordsArchive} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render Crossowrds titles', () => {
    const { getByText } = render(<Archive data={corsswordsArchive} />);
    const cryptic = getByText('CRYPTIC');
    expect(cryptic).toBeInTheDocument();
    const concise = getByText('CONCISE');
    expect(concise).toBeInTheDocument();
    const mephisto = getByText('MEPHISTO');
    expect(mephisto).toBeInTheDocument();
  });

  it('should render Sudoku titles', () => {
    const { getByText } = render(<Archive data={sudokuArchive} />);
    const sudoku = getByText('SUDOKU');
    expect(sudoku).toBeInTheDocument();
    const killerSudoku = getByText('KILLER SUDOKU');
    expect(killerSudoku).toBeInTheDocument();
  });

  it('should expand once accordion control is clicked', () => {
    const { getAllByTestId } = render(<Archive data={sudokuArchive} />);
    const expandBtn = getAllByTestId('accordion-control')[1];
    expect(expandBtn).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(expandBtn);
    expect(expandBtn).toHaveAttribute('aria-expanded', 'true');
  });
});
