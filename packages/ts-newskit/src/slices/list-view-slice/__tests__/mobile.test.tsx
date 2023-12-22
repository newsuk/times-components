import React from 'react';
import '@testing-library/jest-dom';
import { leadArticles } from '../data.json';
import { renderComponent } from '../../../utils';
import { ListViewSliceMobile } from '../mobile';
import { fireEvent } from '@testing-library/react';

const mockClickHandler = jest.fn();
const mockMobilePageClick = jest.fn();

const defaultProps = {
  leadArticles,
  clickHandler: mockClickHandler,
  currentPage: 1,
  onMobilePageClick: mockMobilePageClick,
  totalItems: 12
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
    expect(mockMobilePageClick).toHaveBeenCalled();
    expect(loadMoreButton).toBeTruthy();
  });
  it(`doesn't render load more button when no items to load`, () => {
    const props = { ...defaultProps, totalItems: 8 };
    const { queryByText } = renderComponent(<ListViewSliceMobile {...props} />);
    const loadMoreButton = queryByText('Load more');
    expect(loadMoreButton).toBeFalsy();
  });
});
