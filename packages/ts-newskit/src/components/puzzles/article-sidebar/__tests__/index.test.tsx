import React from 'react';
import { ArticleSidebar, ArticleSideBarProps } from '../index';
import { render } from '../../../../utils/test-utils';
import '@testing-library/jest-dom';

const defaultProps: ArticleSideBarProps = {
  title: 'Puzzles for you',
  data: [
    {
      puzzleTitle: 'Crossword',
      puzzleUrl: 'https://www.thetimes.co.uk/puzzles/crossword',
      imgUrl:
        'https://www.thetimes.co.uk/imageserver/image/%2Fpuzzles%2Ficons%2F33b27655-dcc9-421f-906f-b2b10dd26865.png?crop=1250%2C833%2C0%2C0&resize=500'
    },
    {
      puzzleTitle: 'Polygon',
      puzzleUrl: 'https://www.thetimes.co.uk/puzzles/sudoku',
      imgUrl:
        'https://www.thetimes.co.uk/imageserver/image/%2Fpuzzles%2Ficons%2F33b27655-dcc9-421f-906f-b2b10dd26865.png?crop=1250%2C833%2C0%2C0&resize=500'
    }
  ]
};

const renderComponent = (props: ArticleSideBarProps) =>
  render(<ArticleSidebar {...props} />);

describe('ArticleSidebar', () => {
  it('should render ArticleSidebar component', () => {
    const { asFragment } = renderComponent(defaultProps);
    expect(asFragment()).toMatchSnapshot();
  });
});
