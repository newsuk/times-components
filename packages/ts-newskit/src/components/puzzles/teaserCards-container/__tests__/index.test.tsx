import React from 'react';
import { render } from '../../../../utils/test-utils';
import { TeaserCardsContainer } from '../index';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { Categories } from '../fixtures/data.json';

describe('TeaserCardsContainer tests', () => {
  it('should render a snapshot', () => {
    const { asFragment } = render(
      <TeaserCardsContainer
        types={Categories}
        title="Subscribe to access all of The Times puzzles"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should display the correct title', () => {
    const { getByTestId } = render(
      <TeaserCardsContainer
        types={Categories}
        title="Subscribe to access all of The Times puzzles"
      />
    );

    const titleBar = getByTestId('title-bar');
    expect(titleBar).toHaveTextContent(
      'Subscribe to access all of The Times puzzles'
    );
  });

  it('should navigate to the correct URL when clicked', () => {
    const { getAllByTestId } = render(
      <TeaserCardsContainer
        types={Categories}
        title="Subscribe to access all of The Times puzzles"
      />
    );

    const cards = getAllByTestId('single-card');
    fireEvent.click(cards[0]);
  });
});
