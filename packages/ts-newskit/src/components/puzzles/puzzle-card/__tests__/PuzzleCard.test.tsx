import React from 'react';
import '@testing-library/jest-dom';
import { render } from '../../../../utils/test-utils';
import { puzzles } from '../fixtures/data.json';
import { PuzzleCard, PuzzleCardProps } from '../index';

const renderComponent = (props: PuzzleCardProps) =>
  render(<PuzzleCard {...props} />);

const defaultProps = {
  id: puzzles.list[0].id,
  shortIdentifier: puzzles.list[0].shortIdentifier,
  title: puzzles.list[0].title,
  publishedAt: puzzles.list[0].publishedAt,
  status: puzzles.list[0].status,
  url: puzzles.list[0].url,
  image: puzzles.list[0].image
};

describe('Puzzle Card', () => {
  it('should render Puzzle Card', () => {
    const { asFragment } = renderComponent(defaultProps);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the puzzle card title', () => {
    const { getByText } = renderComponent(defaultProps);
    expect(getByText(puzzles.list[0].title)).toBeInTheDocument();
  });

  it('renders the puzzle card image placeholder', () => {
    const { getByTestId, queryByTestId } = renderComponent(defaultProps);
    const image = queryByTestId('puzzle-image');
    if (image) {
      expect(queryByTestId('puzzle-placeholder')).not.toBeInTheDocument();
    } else {
      const placeholder = getByTestId('puzzle-placeholder');
      expect(placeholder).toBeInTheDocument();
    }
  });

  it('renders the puzzle card image URL', () => {
    const imageUrl = 'https://example.com/image.jpg';
    const imageData = {
      ...puzzles.list[0].image,
      src: imageUrl
    };
    const imageAlt = puzzles.list[0].title || 'Puzzle thumbnail';
    const { getByRole } = render(
      <PuzzleCard
        id={puzzles.list[0].id}
        shortIdentifier={puzzles.list[0].shortIdentifier}
        title={puzzles.list[0].title}
        publishedAt={puzzles.list[0].publishedAt}
        status={puzzles.list[0].status}
        url={puzzles.list[0].url}
        image={imageData}
      />
    );
    expect(getByRole('img', { name: imageAlt })).toHaveAttribute(
      'src',
      'https://example.com/image.jpg'
    );
  });
});
