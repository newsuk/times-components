import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '../../../../utils/test-utils';
import { StoryCard, StoryCardProps } from '../index';

const renderComponent = (props: StoryCardProps) =>
  render(<StoryCard {...props} />);

const defaultProps = {
  image:
    'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F086a8da2-dec6-11ed-9cc2-0f7e26ed83eb.jpg?crop=3995%2C2247%2C0%2C208&resize=498',
  altText: 'Some alt text',
  title: 'ChatGPT invents Sudoku-style puzzle to keep the humans busy',
  url: 'https://newskit.co.uk/',
  category: 'Review',
  timeToRead: '4 min read',
  imgHiddenMobile: false,
  hiddenMobile: false,
  mobileDivider: false
};

describe('Render puzzles story card', () => {
  it('should render a snapshot', () => {
    const { asFragment } = renderComponent(defaultProps);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the component', () => {
    const { getByText } = renderComponent(defaultProps);
    const getArticleListItem = getByText(
      'ChatGPT invents Sudoku-style puzzle to keep the humans busy'
    );
    expect(getArticleListItem).toBeInTheDocument();
  });

  it('items should have link with href', () => {
    const { getAllByTestId } = renderComponent(defaultProps);
    const storyCardUrl = getAllByTestId('storyCard-link')[0];
    expect(storyCardUrl).toHaveAttribute('href', 'https://newskit.co.uk/');
  });

  it('items should render ALT text', () => {
    renderComponent(defaultProps);
    const storyCardAlt = screen.getByAltText('Some alt text');
    expect(storyCardAlt).toHaveAttribute('alt', 'Some alt text');
  });

  it('items should render TITLE text if ALT is missing', () => {
    renderComponent({
      image:
        'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F086a8da2-dec6-11ed-9cc2-0f7e26ed83eb.jpg?crop=3995%2C2247%2C0%2C208&resize=498',
      altText: '',
      title: 'ChatGPT invents Sudoku-style puzzle to keep the humans busy',
      url: 'https://newskit.co.uk/',
      category: 'Review',
      timeToRead: '4 min read',
      imgHiddenMobile: false,
      hiddenMobile: false,
      mobileDivider: false
    });
    const storyCardAlt = screen.getByAltText(
      'ChatGPT invents Sudoku-style puzzle to keep the humans busy'
    );
    expect(storyCardAlt).toHaveAttribute(
      'alt',
      'ChatGPT invents Sudoku-style puzzle to keep the humans busy'
    );
  });
  it('items should render PLACEHOLDER if IMAGE is missing', () => {
    const { getAllByTestId } = renderComponent({
      image: '',
      altText: 'Some alt text',
      title: 'ChatGPT invents Sudoku-style puzzle to keep the humans busy',
      url: 'https://newskit.co.uk/',
      category: 'Review',
      timeToRead: '4 min read',
      imgHiddenMobile: false,
      hiddenMobile: false,
      mobileDivider: false
    });
    const storyCardPlaceholder = getAllByTestId('storyCard-placeholder')[0];
    expect(storyCardPlaceholder).toBeVisible;
  });
});
