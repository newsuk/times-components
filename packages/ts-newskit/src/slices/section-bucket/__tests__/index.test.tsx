import React from 'react';
import { useBreakpointKey } from 'newskit';
import { render, fireEvent } from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import { SectionBucket } from '../index';
import {
  articleStackOne,
  articleStackTwo,
  articleStackThree,
  articleStackFour
} from '../../fixtures/data.json';

jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('xl')
}));

const mockClickHandler = jest.fn();
const mockSliceHeaderClickHandler = jest.fn();

const renderComponent = () =>
  render(
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
    />
  );

describe('Render SectionBucket Slice', () => {
  test('Slice matches snapshot for `null` breakpoint value', () => {
    (useBreakpointKey as any).mockReturnValue(null);
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  test('Slice matches snapshot with sm', () => {
    (useBreakpointKey as any).mockReturnValue('sm');
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  test('Slice matches snapshot with xl', () => {
    (useBreakpointKey as any).mockReturnValue('xl');

    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders correct number of article blocks', () => {
    const { getAllByTestId } = renderComponent();
    const articleStackContainer = getAllByTestId('article-block');

    expect(articleStackContainer.length).toBe(4);
  });
  test('calls the click event when the slice header button is clicked', () => {
    const { getAllByRole } = renderComponent();
    const links = getAllByRole('link');
    links.map(link => fireEvent.click(link));
    expect(mockSliceHeaderClickHandler).toHaveBeenCalledTimes(4);
    expect(mockSliceHeaderClickHandler).toHaveBeenCalledWith('Title bar');
  });

  test('renders correct number of articles in each blocks', () => {
    const { getAllByTestId } = renderComponent();
    const articleStackBlocks = getAllByTestId('article-block');
    articleStackBlocks.forEach(block => {
      const articles = block.querySelectorAll('.css-1nw1nne');
      expect(articles.length).toBe(3);
    });
  });
});
