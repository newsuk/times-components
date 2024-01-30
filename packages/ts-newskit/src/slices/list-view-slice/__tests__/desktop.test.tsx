import React from 'react';
import '@testing-library/jest-dom';
import { leadArticles } from '../data.json';
import { renderComponent } from '../../../utils';
import { ListViewSliceDesktop } from '../desktop';
import { fireEvent } from '@testing-library/react';
import { SectionAd } from '../utils/ads';

const mockClickHandler = jest.fn();
const handlePageChange = jest.fn();
const onPageChange = jest.fn();

const defaultProps = {
  leadArticles,
  clickHandler: mockClickHandler,
  handlePageChange,
  onPageChange,
  totalItems: 11,
  SectionAd,
  SectionAdMob: SectionAd,
  StickyAd: SectionAd
};

describe('Render ListViewSliceDesktop', () => {
  it('matches snapshot', () => {
    const { asFragment } = renderComponent(
      <ListViewSliceDesktop {...defaultProps} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('matches snapshot when isLoading is TRUE', () => {
    const { asFragment } = renderComponent(
      <ListViewSliceDesktop {...defaultProps} isLoading />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('triggers correctly when clicking page', () => {
    const { getAllByTestId } = renderComponent(
      <ListViewSliceDesktop {...defaultProps} />
    );
    const paginationButton = getAllByTestId('pagination-item')[1];
    fireEvent.click(paginationButton);
    expect(handlePageChange).toHaveBeenCalled();
    expect(onPageChange).toHaveBeenCalled();
    expect(paginationButton).toBeTruthy();
  });
});

describe('ListViewSliceDesktop pagination', () => {
  it('does not triggers when clicking previous and on first page', () => {
    const { getByTestId } = renderComponent(
      <ListViewSliceDesktop {...defaultProps} />
    );
    const paginationButton = getByTestId('pagination-prev-item');
    fireEvent.click(paginationButton);
    expect(handlePageChange).not.toHaveBeenCalled();
  });

  it('does trigger when clicking previous and NOT on first page', () => {
    const { getByTestId } = renderComponent(
      <ListViewSliceDesktop {...defaultProps} currentPage={2} />
    );
    const paginationButton = getByTestId('pagination-prev-item');
    fireEvent.click(paginationButton);
    expect(handlePageChange).toHaveBeenCalledWith(1);
  });

  it('triggers correctly when clicking next item', () => {
    const { getByTestId } = renderComponent(
      <ListViewSliceDesktop {...defaultProps} />
    );
    const paginationButton = getByTestId('pagination-next-item');
    fireEvent.click(paginationButton);
    expect(handlePageChange).toHaveBeenCalledWith(2);
    expect(onPageChange).toHaveBeenCalled();
  });
});
