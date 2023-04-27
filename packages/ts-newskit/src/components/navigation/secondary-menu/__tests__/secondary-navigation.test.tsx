import React from 'react';
import { render } from '../../../../utils/test-utils';
import '@testing-library/jest-dom';
import { mainMenuItems } from '../fixtures/menu-items.json';
import { SecondaryNavigation } from '../index';
import { cleanup, fireEvent, waitFor } from '@testing-library/react';

describe('Secondary Menu', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render snapshot', () => {
    const { asFragment } = render(
      <SecondaryNavigation data={mainMenuItems} pageSlug="home" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should close the dropdown ', () => {
    const { getByText, queryByText, getAllByText } = render(
      <SecondaryNavigation data={mainMenuItems} pageSlug="home" />
    );
    const SeeAllButton = getByText('See all');
    fireEvent.click(SeeAllButton);
    waitFor(() => expect(queryByText('News')).toBeInTheDocument());
    waitFor(() => expect(queryByText('Close')).toBeInTheDocument());
    const newsButton = getAllByText('News')[0];
    fireEvent.click(newsButton);
    waitFor(() => expect(queryByText('News')).toBeInTheDocument());
  });
});
