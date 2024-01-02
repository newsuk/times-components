import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render, screen } from '../../../../../utils/test-utils';
import '@testing-library/jest-dom';
import data from '../../__tests__/fixtures/test-data.json';

import HamburgerMenu from '../HamburgerMenu';
const mockClickHandler = jest.fn();

const renderComponent = (loggedIn: boolean) =>
  render(
    <HamburgerMenu
      data={data}
      isLoggedIn={loggedIn}
      hamburgerClickHandler={mockClickHandler}
    />
  );

describe('HamburgerMenu', () => {
  it('should render the component', () => {
    const { asFragment } = renderComponent(true);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should expand the L1 you click on it', () => {
    const { getByText, getAllByTestId } = renderComponent(true);
    expect(getByText('Item 1')).not.toBeVisible();
    const Button = getAllByTestId('menu-sub-button')[0];
    fireEvent.click(Button);
    expect(getByText('Item 1')).toBeVisible();
  });
  it('should close the expanded L1 if you click on it again', () => {
    const { getByText, getAllByTestId } = renderComponent(true);
    expect(getByText('Item 1')).not.toBeVisible();
    const Button = getAllByTestId('menu-sub-button')[0];
    fireEvent.click(Button);
    expect(getByText('Item 1')).toBeVisible();
    fireEvent.click(Button);
    expect(getByText('Item 1')).not.toBeVisible();
  });
  it('should close the expanded L1 if you click on another L1', () => {
    const { getByText, getAllByTestId } = renderComponent(true);
    expect(getByText('Item 1')).not.toBeVisible();
    const Button1 = getAllByTestId('menu-sub-button')[0];
    const Button2 = getAllByTestId('menu-sub-button')[1];
    fireEvent.click(Button1);
    expect(getByText('Item 1')).toBeVisible();
    fireEvent.click(Button2);
    expect(getByText('Item 1')).not.toBeVisible();
  });
});

describe('HamburgerMenu - Logged In', () => {
  it('should render the Sections and account section on smaller devices', () => {
    const { asFragment, getByText } = renderComponent(true);
    expect(asFragment()).toMatchSnapshot();
    expect(getByText('Sections')).toBeVisible();
    expect(getByText('My account')).toBeVisible();
  });

  it('should default to show the Sections', () => {
    const { getByText, queryByText } = renderComponent(true);
    expect(queryByText('Account Menu 1')).toBeFalsy();
    expect(getByText('Main Menu 1')).toBeVisible();
    expect(getByText('More 1')).toBeVisible();
  });

  it('should change the nav items if you click onto the Logged in Menu buttons', () => {
    const { getByText, queryByText } = renderComponent(true);
    expect(getByText('Main Menu 1')).toBeVisible();
    expect(queryByText('Account Menu 1')).toBeFalsy();
    const myAccountButton = getByText('My account');
    fireEvent.click(myAccountButton);
    expect(getByText('Account Menu 1')).toBeVisible();
    expect(queryByText('Main Menu 1')).toBeFalsy();
    const SectionsButton = getByText('Sections');
    fireEvent.click(SectionsButton);
    expect(getByText('Main Menu 1')).toBeVisible();
    expect(queryByText('Account Menu 1')).toBeFalsy();
  });

  it('should indicate active l1', () => {
    window.history.pushState({}, '', '/main-menu-1');
    const { getAllByTestId } = renderComponent(true);
    const Button = getAllByTestId('buttonLink')[0];
    expect(Button).toHaveClass('active');
  });

  it('should indicate active l2', () => {
    window.history.pushState({}, '', '/main-menu-2/item-1');
    const { getAllByTestId } = renderComponent(true);
    const Button = getAllByTestId('buttonLink')[1];
    expect(Button).toHaveClass('active');
  });

  it('should indicate sub l1 item', () => {
    window.history.pushState({}, '', '/main-menu-4');
    const { getAllByTestId } = renderComponent(true);
    const Button = getAllByTestId('buttonLink')[5];
    expect(Button).toHaveClass('active');
  });

  it('should indicate nested l1 item', () => {
    window.history.pushState({}, '', '/nested-l1');
    const { getAllByTestId } = renderComponent(true);
    const Button = getAllByTestId('buttonLink')[6];
    expect(Button).toHaveClass('active');
  });
});

describe('HamburgerMenu - Logged Out', () => {
  it('should only show the Sections and not the account menu', () => {
    const { getByText, queryByText } = renderComponent(false);
    expect(queryByText('Account Menu 1')).toBeFalsy();
    expect(getByText('Main Menu 1')).toBeVisible();
    expect(getByText('More 1')).toBeVisible();
  });
});

describe('Search field', () => {
  it('contains the search bar', () => {
    const { getByPlaceholderText } = renderComponent(false);
    expect(getByPlaceholderText('Search times.co.uk')).toBeVisible();
  });

  it('should update search field value', async () => {
    renderComponent(false);

    const searchField = screen.getByPlaceholderText('Search times.co.uk');

    fireEvent.change(searchField, {
      target: { value: 'Test Value' }
    });
    expect(searchField.getAttribute('value')).toEqual('Test Value');
  });

  it('should clear search field when clicked', async () => {
    renderComponent(false);

    const searchField = screen.getByPlaceholderText('Search times.co.uk');

    fireEvent.change(searchField, {
      target: { value: 'Test Value' }
    });

    const clearSearchBtn = screen.getByRole('button', { name: 'Clear search' });
    expect(searchField).toBeVisible();
    expect(clearSearchBtn).toBeVisible();

    fireEvent.click(clearSearchBtn);

    expect(searchField.getAttribute('value')).toEqual('');
  });
});
