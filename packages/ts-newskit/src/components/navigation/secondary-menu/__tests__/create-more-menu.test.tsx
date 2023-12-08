import React from 'react';
import '@testing-library/jest-dom';
import { mainMenuItems } from '../fixtures/menu-items.json';
import { CreateMoreMenu } from '../desktop/create-more-menu';
import { BreakpointKeys } from 'newskit';
import { renderComponent } from '../../../../utils';
import { fireEvent } from '../../../../utils/test-utils';
import { SecondaryMenuItem } from '../types';

const options = {
  handleSelect: jest.fn(),
  setIsExpanded: jest.fn(),
  isExpanded: false,
  isSelected: 'Puzzles'
};

const mockClickHandler = jest.fn();

const renderMoreMenu = (
  menuItems: SecondaryMenuItem[] = mainMenuItems,
  size: BreakpointKeys = 'xl'
) =>
  renderComponent(
    <CreateMoreMenu
      data={menuItems}
      options={options}
      clickHandler={mockClickHandler}
    />,
    size
  );

describe('Create More Menu', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should render snapshot', () => {
    const { asFragment } = renderMoreMenu();
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render the menu item', () => {
    const { getByText } = renderMoreMenu();
    const title = getByText('Puzzles');
    expect(title).not.toBeVisible();
  });
  it('items should have ancher with href', () => {
    const { getAllByTestId } = renderMoreMenu();
    const title = getAllByTestId('buttonLink')[0];
    expect(title).toHaveAttribute('href', '/home');
  });
  it('items should have ancher with href', () => {
    const { getByText } = renderMoreMenu();
    const title = getByText('Puzzles');
    fireEvent.click(title);
    expect(options.handleSelect).toHaveBeenCalled();
    expect(options.setIsExpanded).toHaveBeenCalled();
  });

  it('no items should be visible when xl breakpoint', () => {
    const { getByText } = renderMoreMenu();
    const firstListITem = getByText(mainMenuItems[0].title);
    const lastListITem = getByText(
      mainMenuItems[mainMenuItems.length - 1].title
    );
    expect(firstListITem).not.toBeVisible();
    expect(lastListITem).not.toBeVisible();
  });

  it('0 items should be visible when not expanded', () => {
    const updatedMenu = mainMenuItems.map(
      menuItem =>
        menuItem.title === mainMenuItems[mainMenuItems.length - 1].title
          ? {
              ...menuItem,
              lg: true,
              xl: true
            }
          : menuItem
    );

    const { getByText } = renderMoreMenu(updatedMenu, 'lg');
    const firstListItem = getByText(updatedMenu[0].title);
    const lastListItem = getByText(updatedMenu[updatedMenu.length - 1].title);
    expect(firstListItem).not.toBeVisible();
    expect(lastListItem).not.toBeVisible();
  });
});
