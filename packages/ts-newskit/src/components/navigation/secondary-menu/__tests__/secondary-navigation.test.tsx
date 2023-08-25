import React from 'react';
import { render } from '../../../../utils/test-utils';
import '@testing-library/jest-dom';
import { mainMenuItems } from '../fixtures/menu-items.json';
import { SecondaryNavigation } from '../index';
import {
  cleanup,
  fireEvent,
  getAllByTestId,
  waitFor
} from '@testing-library/react';

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
      <SecondaryNavigation
        data={mainMenuItems}
        pageSlug="home"
        stickyTop={0}
        onClick={() => {
          // noop
        }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not highlight any titles when default index is not provided', () => {
    const { container } = render(
      <SecondaryNavigation
        data={[mainMenuItems[0], mainMenuItems[1]]}
        pageSlug=""
        stickyTop={0}
        onClick={() => {
          // noop
        }}
      />
    );

    const firstMenuItem = getAllByTestId(container, 'buttonLink')[0];
    const secondMenuItem = getAllByTestId(container, 'buttonLink')[1];

    expect(firstMenuItem).toHaveStyle({
      'border-bottom': '4px solid transparent'
    });
    expect(secondMenuItem).toHaveStyle({
      'border-bottom': '4px solid transparent'
    });
  });

  it('should highlight the correct title when default index is provided', () => {
    const { container } = render(
      <SecondaryNavigation
        data={[mainMenuItems[0], mainMenuItems[1]]}
        pageSlug=""
        stickyTop={0}
        defaultSelectedIndex={0}
        onClick={() => {
          // noop
        }}
      />
    );

    const firstMenuItem = getAllByTestId(container, 'buttonLink')[0];
    const secondMenuItem = getAllByTestId(container, 'buttonLink')[1];

    expect(firstMenuItem).toHaveStyle({
      'border-bottom': '4px solid #01000d'
    });
    expect(secondMenuItem).toHaveStyle({
      'border-bottom': '4px solid transparent'
    });
  });

  it('should close the dropdown ', () => {
    const { getByText, queryByText, getAllByText } = render(
      <SecondaryNavigation
        data={mainMenuItems}
        pageSlug="home"
        stickyTop={110}
        stickyTopDesktop={60}
        onClick={() => {
          // noop
        }}
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
