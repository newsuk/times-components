import React from 'react';
import '@testing-library/jest-dom';
import { render } from '../../../../utils/test-utils';
import { CategoryCard, CategoryCardProps } from '../index';
import { NewsKitSudokusIcon } from '../../../../assets/index';

const renderComponent = (props: CategoryCardProps) =>
  render(<CategoryCard {...props} />);

const defaultProps = {
  type: 'Sudokus',
  url: 'https://newskit.co.uk/',
  Icon: NewsKitSudokusIcon
};

describe('Render puzzles category card', () => {
  it('should render a snapshot', () => {
    const { asFragment } = renderComponent(defaultProps);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the component', () => {
    const { getByText } = renderComponent(defaultProps);
    const getArticleListItem = getByText('Sudokus');
    expect(getArticleListItem).toBeInTheDocument();
  });

  it('items should have link with href', () => {
    const { getAllByTestId } = renderComponent(defaultProps);
    const categoryCardUrl = getAllByTestId('categoryCard-link')[0];
    expect(categoryCardUrl).toHaveAttribute('href', 'https://newskit.co.uk/');
  });
});
