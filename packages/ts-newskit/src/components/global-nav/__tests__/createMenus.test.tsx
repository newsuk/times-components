import React from 'react';
import { screen, render, within, fireEvent } from '../../utils/test-utils';
import '@testing-library/jest-dom';
// import { createMenu } from '../createMenus';
import { useBreakpointKey } from 'newskit';
// import data from './fixtures/test-data.json';
import TopNav from '../topnav';

jest.mock("newskit", () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('xl'),
}));

afterAll(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

describe('createMenu', () => {
  it('should render the correct menu length at "lg" breakpoint', async () => {
    (useBreakpointKey as any).mockReturnValue('lg');

    render(<TopNav />);
    const menu = screen.getByRole('list');
    const menuItems = within(menu).queryAllByRole('listitem');

    expect(menuItems.length).toEqual(5);
  });

  it('should render the correct menu length at other breakpoints', async () => {
    (useBreakpointKey as any).mockReturnValue('xs');

    render(<TopNav />);
    const menu = screen.getByRole('list');
    const menuItems = within(menu).queryAllByRole('listitem');

    expect(menuItems.length).toEqual(9);
  });

  it('should trigger "selected" value when <MenuSub> is clicked', async () => {
    (useBreakpointKey as any).mockReturnValue('lg');

    render(<TopNav />);
    const menu = screen.getByRole('list');
    const MenuSub = within(menu).getByTestId('menu-sub-button');
    
    fireEvent.click(MenuSub);
    expect(MenuSub.getAttribute('aria-expanded')).toEqual("true");
  });
});

describe('accountCreateMenu', () => {
  it('isLoggedIn Menu', async () => {
    render(<TopNav isLoggedIn />);
    const menu = screen.getByLabelText('My Account Menu');
    const MenuSub = within(menu).getByTestId('menu-sub-button');

    fireEvent.click(MenuSub);
    expect(MenuSub.getAttribute('aria-expanded')).toEqual("true");
  });


  // it('should render the correct style preset at xs/sm breakpoints', async () => {
  //   (useBreakpointKey as any).mockReturnValue('xs');

  //   render(<TopNav />)
  //   const menu = screen.getByRole('list');
  //   const menuItem = within(menu).getByRole('listitem');

  //   console.log("menuItem: ", menuItem);
  //   expect(menuItem).toHaveStyle({borderBottom: "4px solid transparent"});
  // });

  // it('should render the correct style preset at breakpoints other than xs/sm', async () => {
  //   (useBreakpointKey as any).mockReturnValue('xl');

  //   render(<TopNav />)
  //   const menu = screen.getByRole('list');
  //   const menuItem = within(menu).getByRole('listitem');

  //   console.log("menuItem2: ", menuItem);
  //   expect(menuItem).toHaveStyle({borderBottom: "4px solid transparent"});
  // });

});

// describe('TopNav button functions', () => {
//   it('should trigger function when hamburger icon clicked', async() => {
//     renderComponent();
//     const hamburgerBtn = screen.getByRole('button', { name: "Open Menu" });

//     expect(hamburgerBtn).toBeVisible();
    
//     fireEvent.click(hamburgerBtn);
//     expect(hamburgerBtn.getAttribute('aria-label')).toEqual('Close Menu');
//   });

//   it('should trigger function when search icon clicked', async () => {
//     // await Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1300 })
//     // await window.dispatchEvent(new Event('resize'));

//     renderComponent();
//     const searchBtn = screen.getByRole('button', { name: "Open Search", hidden: true });

//     fireEvent.click(searchBtn);
//     expect(searchBtn.getAttribute('aria-label')).toEqual('Close Search');
//   });
// });

// describe('Search field', () => {
//   it('should update onChange', async () => {
//     render(<NavSearch />);
//     const searchField: HTMLInputElement = screen.getByRole('textbox');    
//     fireEvent.change(searchField, {target: {value: 'test'}});

//     expect(searchField.getAttribute('value')).toBe('test');
//   });

//   it('should clear value when button is clicked', async () => {
//     render(<NavSearch />);
//     const searchField: HTMLInputElement = screen.getByRole('textbox');    
//     const searchClearBtn = screen.getByRole('button');
//     fireEvent.change(searchField, {target: {value: 'test'}});

//     fireEvent.click(searchClearBtn);
//     const updatedSearchField: HTMLInputElement = screen.getByRole('textbox');    

//     expect(updatedSearchField.value).toBe('');
//   });

//   // it('should trigger function when hamburger icon clicked', () => {

//   //   expect(hamburgerBtn).toBeVisible();
//   //   fireEvent.click(hamburgerBtn);
//   //   expect(hamburgerBtn).not.toBeVisible();
//   // });
//   // it('should close the expanded L1 if you click on it again', () => {
//   //   const { getByText, getAllByTestId } = render(
//   //     <HamburgerMenu data={data} loggedIn={true} />
//   //   );
//   //   expect(getByText('Item 1')).not.toBeVisible();
//   //   const Button = getAllByTestId('menu-sub-button')[0];
//   //   fireEvent.click(Button);
//   //   expect(getByText('Item 1')).toBeVisible();
//   //   fireEvent.click(Button);
//   //   expect(getByText('Item 1')).not.toBeVisible();
//   // });
//   // it('should close the expanded L1 if you click on another L1', () => {
//   //   const { getByText, getAllByTestId } = render(
//   //     <HamburgerMenu data={data} loggedIn={true} />
//   //   );
//   //   expect(getByText('Item 1')).not.toBeVisible();
//   //   const Button1 = getAllByTestId('menu-sub-button')[0];
//   //   const Button2 = getAllByTestId('menu-sub-button')[1];
//   //   fireEvent.click(Button1);
//   //   expect(getByText('Item 1')).toBeVisible();
//   //   fireEvent.click(Button2);
//   //   expect(getByText('Item 1')).not.toBeVisible();
//   // });
// });

// // describe('HamburgerMenu - Logged In', () => {
// //   it('should render the Sections and account section on smaller devices', () => {
// //     const { asFragment, getByText } = render(
// //       <HamburgerMenu data={data} loggedIn={true} />
// //     );
// //     expect(asFragment()).toMatchSnapshot();
// //     expect(getByText('Sections')).toBeVisible();
// //     expect(getByText('My account')).toBeVisible();
// //   });

// //   it('should default to show the Sections', () => {
// //     const { getByText, queryByText } = render(
// //       <HamburgerMenu data={data} loggedIn={true} />
// //     );
// //     expect(queryByText('Account Menu 1')).toBeFalsy();
// //     expect(getByText('Main Menu 1')).toBeVisible();
// //     expect(getByText('More 1')).toBeVisible();
// //   });

// //   it('should change the nav items if you click onto the Logged in Menu buttons', () => {
// //     const { getByText, queryByText } = render(
// //       <HamburgerMenu data={data} loggedIn={true} />
// //     );
// //     expect(getByText('Main Menu 1')).toBeVisible();
// //     expect(queryByText('Account Menu 1')).toBeFalsy();
// //     const myAccountButton = getByText('My account');
// //     fireEvent.click(myAccountButton);
// //     expect(getByText('Account Menu 1')).toBeVisible();
// //     expect(queryByText('Main Menu 1')).toBeFalsy();
// //     const SectionsButton = getByText('Sections');
// //     fireEvent.click(SectionsButton);
// //     expect(getByText('Main Menu 1')).toBeVisible();
// //     expect(queryByText('Account Menu 1')).toBeFalsy();
// //   });
// //   it('contains the search bar', () => {
// //     const { getByPlaceholderText } = render(
// //       <HamburgerMenu data={data} loggedIn={true} />
// //     );
// //     expect(getByPlaceholderText('Search times.co.uk')).toBeVisible();
// //   });
// // });

// // describe('HamburgerMenu - Logged Out', () => {
// //   it('should render the login and subscribe button section on smaller devices', () => {
// //     const { asFragment, getByText } = render(
// //       <HamburgerMenu data={data} loggedIn={false} />
// //     );
// //     expect(asFragment()).toMatchSnapshot();
// //     expect(getByText('Log in')).toBeVisible();
// //     expect(getByText('Subscribe')).toBeVisible();
// //   });

// //   it('should only show the Sections and not the account menu', () => {
// //     const { getByText, queryByText } = render(
// //       <HamburgerMenu data={data} loggedIn={false} />
// //     );
// //     expect(queryByText('Account Menu 1')).toBeFalsy();
// //     expect(getByText('Main Menu 1')).toBeVisible();
// //     expect(getByText('More 1')).toBeVisible();
// //   });
// //   it('contains the search bar', () => {
// //     const { getByPlaceholderText } = render(
// //       <HamburgerMenu data={data} loggedIn={false} />
// //     );
// //     expect(getByPlaceholderText('Search times.co.uk')).toBeVisible();
// //   });
// // });
