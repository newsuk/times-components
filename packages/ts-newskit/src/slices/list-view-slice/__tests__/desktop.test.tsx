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
  handlePageChange,
  totalItems: 11,
  StickyAd: SectionAd,
  SectionAd
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
    const paginationButton = getAllByTestId('pagination-item')[1];
    fireEvent.click(paginationButton);
    expect(handlePageChange).toHaveBeenCalled();
    expect(paginationButton).toBeTruthy();
  });
});

describe('ListViewSliceDesktop pagination', () => {
  it('does not triggers when clicking first item and on first page', () => {
    const { getByTestId } = renderComponent(
      <ListViewSliceDesktop {...defaultProps} />
    );
    const paginationButton = getByTestId('pagination-first-item');
    fireEvent.click(paginationButton);
    expect(handlePageChange).not.toHaveBeenCalled();
  });
  it('does not triggers when clicking previous and on first page', () => {
    const { getByTestId } = renderComponent(
      <ListViewSliceDesktop {...defaultProps} />
    );
    const paginationButton = getByTestId('pagination-prev-item');
    fireEvent.click(paginationButton);
    expect(handlePageChange).not.toHaveBeenCalled();
  });

  it('does trigger when clicking first item and NOT on first page', () => {
    const { getByTestId } = renderComponent(
      <ListViewSliceDesktop {...defaultProps} currentPage={2} />
    );
    const paginationButton = getByTestId('pagination-first-item');
    fireEvent.click(paginationButton);
    expect(handlePageChange).toHaveBeenCalledWith(1);
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
  });

  it('triggers correctly when clicking last item', () => {
    const { getByTestId } = renderComponent(
      <ListViewSliceDesktop {...defaultProps} />
    );
    const paginationButton = getByTestId('pagination-last-item');
    fireEvent.click(paginationButton);
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });
});
