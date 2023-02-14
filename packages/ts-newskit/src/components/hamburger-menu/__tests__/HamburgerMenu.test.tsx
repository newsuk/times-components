import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { customRender } from './utils/test-utils';
import '@testing-library/jest-dom';
import data from './fixtures/test-data.json';

import HamburgerMenu from '../HamburgerMenu';

describe('HamburgerMenu', () => {
  it('should render the component', () => {
    const { asFragment } = customRender(<HamburgerMenu data={data} loggedIn={true}/>);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should expand the L1 you click on it', () => {
    const { getByText, getAllByTestId } = customRender(<HamburgerMenu data={data} loggedIn={true}/>);
    expect(getByText('Item 1')).not.toBeVisible();
    const Button = getAllByTestId('menu-sub-button')[0]
    fireEvent.click(Button);
    expect(getByText('Item 1')).toBeVisible();
  });
  it('should close the expanded L1 if you click on it again', () => {
    const { getByText, getAllByTestId } = customRender(<HamburgerMenu data={data} loggedIn={true}/>);
    expect(getByText('Item 1')).not.toBeVisible();
    const Button = getAllByTestId('menu-sub-button')[0]
    fireEvent.click(Button);
    expect(getByText('Item 1')).toBeVisible();
    fireEvent.click(Button);
    expect(getByText('Item 1')).not.toBeVisible();
  });
  it('should close the expanded L1 if you click on another L1', () => {
    const { getByText, getAllByTestId } = customRender(<HamburgerMenu data={data} loggedIn={true}/>);
    expect(getByText('Item 1')).not.toBeVisible();
    const Button1 = getAllByTestId('menu-sub-button')[0]
    const Button2 = getAllByTestId('menu-sub-button')[1]
    fireEvent.click(Button1);
    expect(getByText('Item 1')).toBeVisible();
    fireEvent.click(Button2);
    expect(getByText('Item 1')).not.toBeVisible();
  });
})

describe('HamburgerMenu - Logged In', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render the Sections and account section on smaller devices', () => {
    const { asFragment, getByText } = customRender(<HamburgerMenu data={data} loggedIn={true}/>);
    expect(asFragment()).toMatchSnapshot();
    expect(getByText('Sections')).toBeVisible();
    expect(getByText('My account')).toBeVisible();
  });

  // it('should not render the Navigaton Button section on larger devices', () => {
  //   const { asFragment, getByText } = customRender(<HamburgerMenu data={data} loggedIn={true}/>);

  //   expect(asFragment()).toMatchSnapshot();
  // });

  it('should default to show the Sections', () => {
    const { getByText, queryByText } = customRender(<HamburgerMenu data={data} loggedIn={true} />)
    expect(getByText('Sections')).toHaveStyle('color: #FFFFFF');
    expect(queryByText('Account Menu 1')).toBeFalsy();
    expect(getByText('Main Menu 1')).toBeVisible();
    expect(getByText('More 1')).toBeVisible();
  });

  it('should change the nav items if you click onto the my account button', () => {
    const { getByText, queryByText } = customRender(<HamburgerMenu data={data} loggedIn={true} />)
    expect(getByText('Main Menu 1')).toBeVisible();
    expect(queryByText('Account Menu 1')).toBeFalsy();
    const myAccountButton = getByText('My account');
    fireEvent.click(myAccountButton);
    expect(getByText('Account Menu 1')).toBeVisible();
    expect(queryByText('Main Menu 1')).toBeFalsy();
  });
  it('contains the search bar', () => {
    const { getByPlaceholderText } = customRender(<HamburgerMenu data={data} loggedIn={true}/>);
    expect(getByPlaceholderText('Search times.co.uk')).toBeVisible();
  });
});

describe('HamburgerMenu - Logged Out', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render the login and subscribe button section on smaller devices', () => {
    const { asFragment, getByText } = customRender(<HamburgerMenu data={data} loggedIn={false}/>);
    expect(asFragment()).toMatchSnapshot();
    expect(getByText('Log in')).toBeVisible();
    expect(getByText('Subscribe')).toBeVisible();
  });

  // it('should not render the Navigaton Button section on larger devices', () => {
  //   const { asFragment, getByText } = customRender(<HamburgerMenu data={data} loggedIn={true}/>);

  //   expect(asFragment()).toMatchSnapshot();
  // });

  it('should only show the Sections and not the account menu', () => {
    const { getByText, queryByText } = customRender(<HamburgerMenu data={data} loggedIn={false} />)
    expect(queryByText('Account Menu 1')).toBeFalsy();
    expect(getByText('Main Menu 1')).toBeVisible();
    expect(getByText('More 1')).toBeVisible();
  });
  it('contains the search bar', () => {
    const { getByPlaceholderText } = customRender(<HamburgerMenu data={data} loggedIn={false}/>);
    expect(getByPlaceholderText('Search times.co.uk')).toBeVisible();
  })
});