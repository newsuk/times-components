import React from 'react';
import { render } from '../../../../utils/test-utils';
import '@testing-library/jest-dom';
import { mainMenuItems } from '../fixtures/menu-items.json';
import { SecondaryNavigation } from '../index';
import { cleanup, fireEvent, waitFor } from '@testing-library/react';

jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('sm')
}));

describe('Secondary Menu', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render snapshot', () => {
    const { asFragment } = render(
      <SecondaryNavigation data={mainMenuItems} pageSlug="home" stickyTop={0} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should close the dropdown ', () => {
    const { getByText, queryByText, getAllByText } = render(
      <SecondaryNavigation
        data={mainMenuItems}
        pageSlug="home"
        stickyTop={110}
        stickyTopDesktop={60}
      />
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
