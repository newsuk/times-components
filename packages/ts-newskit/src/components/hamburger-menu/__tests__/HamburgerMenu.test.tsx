import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { customRender } from './utils/test-utils';
import '@testing-library/jest-dom';

import HamburgerMenu from '../HamburgerMenu';

describe('HamburgerMenu', () => {
  it('should render the component', () => {
    const { asFragment } = customRender(<HamburgerMenu loggedIn={true}/>);

    expect(asFragment()).toMatchSnapshot();
  });

})

describe('HamburgerMenu Logged In', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render the Sections and account section on smaller devices', () => {
    const { asFragment } = customRender(<HamburgerMenu loggedIn={true}/>);

    expect(asFragment()).toMatchSnapshot();
  })

  it('should not render the Navigaton Button section on larger devices', () => {
    const { asFragment } = customRender(<HamburgerMenu loggedIn={true}/>);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should default to show the Sections', () => {
    const { getByText, queryByText } = customRender(<HamburgerMenu loggedIn={true} />)

    expect(getByText('Home')).toBeVisible();
    expect(queryByText('Manage account')).toBeFalsy();
  });

  it('should change the nav items if you click onto the my account button', () => {
    const { getByText, queryByText } = customRender(<HamburgerMenu loggedIn={true} />)
    const myAccountButton = getByText('My account');
    expect(getByText('Home')).toBeVisible();
    expect(queryByText('Manage account')).toBeFalsy();
    fireEvent.click(myAccountButton);
    expect(getByText('Manage account')).toBeVisible();
    expect(queryByText('Home')).toBeFalsy();
  });
});

describe('HamburgerMenu Logged Out', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render the login and subscribe buttons when on smaller devices', () => {
    const { asFragment } = customRender(<HamburgerMenu loggedIn={false}/>);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should not render the login and subscribe buttons when larger devices', () => {
    const { asFragment } = customRender(<HamburgerMenu loggedIn={false}/>);
    expect(asFragment()).toMatchSnapshot();
  });
});
