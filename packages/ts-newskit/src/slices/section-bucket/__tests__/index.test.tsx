import React from 'react';
import { BreakpointKeys } from 'newskit';
import { fireEvent } from '../../../utils/test-utils';
import { renderComponent } from '../../../utils';
import '@testing-library/jest-dom';
import { SectionBucket } from '../index';
import {
  articleStackOne,
  articleStackTwo,
  articleStackThree,
  articleStackFour
} from '../../fixtures/data.json';

const mockClickHandler = jest.fn();
const mockSliceHeaderClickHandler = jest.fn();

const renderSliceComponent = (breakpoint: BreakpointKeys) =>
  renderComponent(
    <SectionBucket
      articleStackOne={{
        ...articleStackOne,
        clickHandler: mockClickHandler,
        sliceHeaderClickHandler: mockSliceHeaderClickHandler
      }}
      articleStackTwo={{
        ...articleStackTwo,
        clickHandler: mockClickHandler,
        sliceHeaderClickHandler: mockSliceHeaderClickHandler
      }}
      articleStackThree={{
        ...articleStackThree,
        clickHandler: mockClickHandler,
        sliceHeaderClickHandler: mockSliceHeaderClickHandler
      }}
      articleStackFour={{
        ...articleStackFour,
        clickHandler: mockClickHandler,
        sliceHeaderClickHandler: mockSliceHeaderClickHandler
      }}
      clickHandler={mockClickHandler}
      sliceHeaderClickHandler={mockSliceHeaderClickHandler}
    />,
    breakpoint
  );

describe('Render SectionBucket Slice', () => {
  test('Slice matches snapshot with sm', () => {
    const { asFragment } = renderSliceComponent('sm');
    expect(asFragment()).toMatchSnapshot();
  });

  test('Slice matches snapshot with xl', () => {
    const { asFragment } = renderSliceComponent('xl');
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders correct number of article blocks', () => {
    const { getAllByTestId } = renderSliceComponent('xl');
    const articleStackContainer = getAllByTestId('article-block');

    expect(articleStackContainer.length).toBe(8);
  });
  test('calls the click event when the slice header button is clicked', () => {
    const { getAllByRole } = renderSliceComponent('xl');
    const links = getAllByRole('link');
    links.map(link => fireEvent.click(link));
    expect(mockSliceHeaderClickHandler).toHaveBeenCalledTimes(4);
    expect(mockSliceHeaderClickHandler).toHaveBeenCalledWith('Title bar');
  });

  test('renders correct number of articles in each blocks', () => {
    const { getAllByTestId } = renderSliceComponent('xl');
    const articleStackBlocks = getAllByTestId('article-block');
    articleStackBlocks.forEach(block => {
      const articles = block.querySelectorAll('.css-1nw1nne');
      expect(articles.length).toBe(3);
    });
  });
});
