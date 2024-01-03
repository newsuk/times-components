import React from 'react';
import '@testing-library/jest-dom';
import { leadArticles } from '../data.json';
import { renderComponent } from '../../../utils';
import { ListViewSliceDesktop } from '../desktop';
import { fireEvent } from '@testing-library/react';
import { SectionAd } from '../utils/ads';

const mockClickHandler = jest.fn();
const handlePageChange = jest.fn();

const defaultProps = {
  leadArticles,
  clickHandler: mockClickHandler,
  currentPage: 1,
  handlePageChange: handlePageChange,
  totalItems: 11,
  StickyAd: SectionAd,
  SectionAd: SectionAd
};

describe('Render ListViewSliceDesktop', () => {
  it('matches snapshot', () => {
    const { asFragment } = renderComponent(
      <ListViewSliceDesktop {...defaultProps} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('triggers correctly when clicking page', () => {
    const { getAllByTestId } = renderComponent(
      <ListViewSliceDesktop {...defaultProps} />
    );
    const paginationButotn = getAllByTestId('pagination-item')[1];
    fireEvent.click(paginationButotn);
    expect(handlePageChange).toHaveBeenCalled();
    expect(paginationButotn).toBeTruthy();
  });
});
