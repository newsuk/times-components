import React from 'react';
import { screen, render, within, fireEvent } from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import { useBreakpointKey } from 'newskit';
import { TopNav } from '../topnav';
import data from '../../fixtures/data.json';

jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('xl')
}));

afterAll(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

const renderComponent = (isLoggedIn?: boolean) =>
  render(
    <TopNav
      isLoggedIn={isLoggedIn}
      mainMenu={data.mainMenuItems}
      accountMenu={data.accountMenuItems}
      isHamburgerOpen={false}
      toggleHamburger={jest.fn}
    />
  );

describe('createMenu', () => {
  it('should render the correct menu length at "lg" breakpoint', async () => {
    (useBreakpointKey as any).mockReturnValue('lg');

    renderComponent();

    const menu = screen.getByRole('list');
    const menuItems = within(menu).queryAllByRole('listitem');

    expect(menuItems.length).toEqual(5);
  });

  it('should render the correct menu length at other breakpoints', async () => {
    (useBreakpointKey as any).mockReturnValue('xs');

    renderComponent();
    const menu = screen.getByRole('list');
    const menuItems = within(menu).queryAllByRole('listitem');

    expect(menuItems.length).toEqual(9);
  });

  it('should trigger "selected" value when <MenuSub> is clicked', async () => {
    (useBreakpointKey as any).mockReturnValue('lg');

    renderComponent();
    const menu = screen.getByRole('list');
    const MenuSub = within(menu).getByTestId('menu-sub-button');

    fireEvent.click(MenuSub);
    expect(MenuSub.getAttribute('aria-expanded')).toEqual('true');
  });
});

describe('accountCreateMenu', () => {
  it('isLoggedIn Menu', async () => {
    renderComponent(true);
    const menu = screen.getByLabelText('My Account Menu');
    const MenuSub = within(menu).getByTestId('menu-sub-button');

    fireEvent.click(MenuSub);
    expect(MenuSub.getAttribute('aria-expanded')).toEqual('true');
  });
});
