import React from 'react';
import { screen, within, fireEvent } from '../../../../../utils/test-utils';
import '@testing-library/jest-dom';
import { BreakpointKeys } from 'newskit';
import { renderComponent } from '../../../../../utils';
import { TopNav } from '../topnav';
import data from '../../fixtures/data.json';

afterAll(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

const renderMenu = (isLoggedIn: boolean, size: BreakpointKeys = 'xl') =>
  renderComponent(
    <TopNav
      isLoggedIn={isLoggedIn}
      mainMenu={data.mainMenuItems}
      accountMenu={data.accountMenuItems}
      isHamburgerOpen={false}
      toggleHamburger={jest.fn}
    />,
    size
  );

describe('createMenu', () => {
  it('should render the correct menu length at "lg" breakpoint', async () => {
    renderMenu(false, 'lg');

    const { asFragment } = renderMenu(false, 'lg');
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the correct menu length at other breakpoints', async () => {
    renderMenu(false, 'xs');

    const { asFragment } = renderMenu(false, 'lg');
    expect(asFragment()).toMatchSnapshot();
  });

  it('should trigger "selected" value when <MenuSub> is clicked', async () => {
    renderMenu(false, 'lg');
    const menu = screen.getByRole('list');
    const MenuSub = within(menu).getByTestId('menu-sub-button');

    fireEvent.click(MenuSub);
    expect(MenuSub.getAttribute('aria-expanded')).toEqual('true');
  });
});

describe('accountCreateMenu', () => {
  it('isLoggedIn Menu', async () => {
    renderMenu(true);
    const menu = screen.getByLabelText('My Account Menu');
    const MenuSub = within(menu).getByTestId('menu-sub-button');

    fireEvent.click(MenuSub);
    expect(MenuSub.getAttribute('aria-expanded')).toEqual('true');
  });
});

describe('NavButtons Logged Out', () => {
  it('should render the correct menu length at other breakpoints', async () => {
    renderMenu(false, 'xs');
    const accountButtons = screen.getByRole('region', {
      name: 'My Account Navigation'
    });

    expect(accountButtons).toBeInTheDocument();
  });

  it('should change the style based on the preset prop passed - Secondary', () => {
    renderMenu(false);
    const loginBtn = screen.getByRole('link', { name: 'Log in' });
    const subscribeBtn = screen.getByRole('link', { name: 'Subscribe' });

    expect(loginBtn).toHaveStyle('background-color: rgba(29,29,27,1)');
    expect(subscribeBtn).toHaveStyle('background-color: rgba(0, 92, 138, 1)');
  });
});
