import React from 'react';
import '@testing-library/jest-dom';
import { ListViewSlice } from '../index';
import { leadArticles } from '../data.json';
import { renderComponent } from '../../../utils';
import { SectionAd } from '../utils/ads';

const mockClickHandler = jest.fn();
const handlePageChange = jest.fn();

const defaultProps = {
  leadArticles,
  clickHandler: mockClickHandler,
  currentPage: 1,
  handlePageChange: handlePageChange,
  totalItems: 10,
  StickyAd: SectionAd,
  SectionAd: SectionAd
};

describe('Render List View Slice', () => {
  test('Slice matches snapshot', () => {
    const { asFragment } = renderComponent(<ListViewSlice {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  test('modifies articles correctly when breakpointKey is "lg"', () => {
    const { asFragment } = renderComponent(
      <ListViewSlice {...defaultProps} />,
      'lg'
    );
    expect(asFragment()).toMatchSnapshot();
  });
  test('modifies articles correctly when breakpointKey is "xl"', () => {
    const { asFragment } = renderComponent(
      <ListViewSlice {...defaultProps} />,
      'xl'
    );
    expect(asFragment()).toMatchSnapshot();
  });
  test('modifies articles correctly when breakpointKey is "xs"', () => {
    const { asFragment } = renderComponent(
      <ListViewSlice {...defaultProps} />,
      'xs'
    );
    expect(asFragment()).toMatchSnapshot();
  });
  test('modifies articles correctly when breakpointKey is "sm"', () => {
    const { asFragment } = renderComponent(
      <ListViewSlice {...defaultProps} />,
      'sm'
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
