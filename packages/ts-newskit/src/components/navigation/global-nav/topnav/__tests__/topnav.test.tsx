import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render, screen } from '../../../../../utils/test-utils';
import '@testing-library/jest-dom';
import { TopNav } from '../topnav';
import data from '../../fixtures/data.json';
const mockClickHandler = jest.fn();

const renderComponent = (isLoggedIn?: boolean, isSunday?: boolean) =>
  render(
    <TopNav
      isLoggedIn={isLoggedIn}
      isSunday={isSunday}
      mainMenu={data.mainMenuItems}
      accountMenu={data.accountMenuItems}
      isHamburgerOpen={false}
      toggleHamburger={jest.fn}
      clickHandler={mockClickHandler}
    />
  );

describe('Render TopNav', () => {
  it('should render the component in loggedIn state', () => {
    const { asFragment } = renderComponent(true);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the component in loggedOut state', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the component with Sunday Times Logo', () => {
    const { asFragment } = renderComponent(true, true);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call the mockClickHandler when log in button clicked', async () => {
    renderComponent(false);
    const loginBtn = screen.getByRole('link', { name: 'Log in' });
    fireEvent.click(loginBtn);
    expect(mockClickHandler).toHaveBeenCalledWith('Log in');
  });

  it('should call the mockClickHandler when Subscribe button clicked', async () => {
    renderComponent(false);
    const subscribeBtn = screen.getByRole('link', { name: 'Subscribe' });
    fireEvent.click(subscribeBtn);
    expect(mockClickHandler).toHaveBeenCalledWith('Subscribe');
  });

  it('should call the mockClickHandler with "Close Menu" when hamburger icon clicked', async () => {
    render(
      <TopNav
        isLoggedIn={true}
        isSunday={false}
        mainMenu={data.mainMenuItems}
        accountMenu={data.accountMenuItems}
        isHamburgerOpen={true}
        toggleHamburger={jest.fn}
        clickHandler={mockClickHandler}
      />
    );
    const hamburgerIcon = screen.getByLabelText('Close Menu');
    fireEvent.click(hamburgerIcon);
    expect(mockClickHandler).toHaveBeenCalledWith('Close Menu');
  });
});

describe('TopNav button functions', () => {
  it('should trigger function when search icon clicked', async () => {
    renderComponent();
    const searchBtn = screen.getByRole('button', {
      name: 'Open Search',
      hidden: true
    });

    fireEvent.click(searchBtn);
    expect(searchBtn.getAttribute('aria-label')).toEqual('Close Search');
  });
});
