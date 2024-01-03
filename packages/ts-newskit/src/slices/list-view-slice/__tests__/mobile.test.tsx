import React from 'react';
import '@testing-library/jest-dom';
import { leadArticles } from '../data.json';
import { renderComponent } from '../../../utils';
import { ListViewSliceMobile } from '../mobile';
import { fireEvent } from '@testing-library/react';
import { SectionAd } from '../utils/ads'

const mockClickHandler = jest.fn();
const handlePageChange = jest.fn();

const defaultProps = {
  leadArticles,
  clickHandler: mockClickHandler,
  currentPage: 1,
  handlePageChange: handlePageChange,
  totalItems: 12,
  StickyAd: SectionAd,
  SectionAd: SectionAd
};

describe('Render ListViewSliceMobile', () => {
  it('matches snapshot', () => {
    const { asFragment } = renderComponent(
      <ListViewSliceMobile {...defaultProps} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('triggers correctly when clicking page', () => {
    const { getByText } = renderComponent(
      <ListViewSliceMobile {...defaultProps} />
    );
    const loadMoreButton = getByText('Load more');
    fireEvent.click(loadMoreButton);
    expect(handlePageChange).toHaveBeenCalled();
    expect(loadMoreButton).toBeTruthy();
  });
  it(`doesn't render load more button when no items to load`, () => {
    const props = { ...defaultProps, totalItems: 8 };
    const { queryByText } = renderComponent(<ListViewSliceMobile {...props} />);
    const loadMoreButton = queryByText('Load more');
    expect(loadMoreButton).toBeFalsy();
  });
});
