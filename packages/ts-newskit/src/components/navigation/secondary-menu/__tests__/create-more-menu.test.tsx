import React from 'react';
import '@testing-library/jest-dom';
import { mainMenuItems } from '../fixtures/menu-items.json';
import { fireEvent } from '@testing-library/react';
import { CreateMoreMenu } from '../desktop/create-more-menu';
import { BreakpointKeys } from 'newskit';
import { renderComponent } from '../../../../utils';

const options = {
  handleSelect: jest.fn(),
  setIsExpanded: jest.fn(),
  isExpanded: false,
  isSelected: 'Puzzles'
};

const mockClickHandler = jest.fn();

const renderMoreMenu = (size: BreakpointKeys = 'xl') =>
  renderComponent(
    <CreateMoreMenu
      data={mainMenuItems}
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
    expect(title).toBeInTheDocument();
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
  // it('9 items should be visible when xl breakpoint', () => {
  //   const { getAllByRole } = renderMoreMenu();
  //   const list = getAllByRole('listitem');
  //   expect(list[0]).toBeVisible();
  //   expect(list[1]).toBeVisible();
  //   expect(list[2]).toBeVisible();
  //   expect(list[3]).toBeVisible();
  //   expect(list[4]).toBeVisible();
  //   expect(list[5]).toBeVisible();
  //   expect(list[6]).toBeVisible();
  //   expect(list[7]).toBeVisible();
  //   expect(list[8]).toBeVisible();
  // });
  // it('7 items should be visible when lg breakpoint', () => {
  //   const { getAllByRole } = renderMoreMenu('lg');
  //   const list = getAllByRole('listitem');
  //   expect(list[0]).toBeVisible();
  //   expect(list[1]).toBeVisible();
  //   expect(list[2]).toBeVisible();
  //   expect(list[3]).toBeVisible();
  //   expect(list[4]).toBeVisible();
  //   expect(list[5]).toBeVisible();
  //   expect(list[6]).toBeVisible();
  //   expect(list[7]).toBeVisible();
  //   expect(list[8]).toBeVisible();
  // });
  // it('7 items should be visible when md breakpoint', () => {
  //   const { getAllByRole,asFragment } = renderMoreMenu('md');
  //   const list = getAllByRole('listitem');
  //   expect(list[0].style).toBe('display: none')
  //   expect(list[1]).toHaveStyle('display: none')
  //   expect(list[2]).toHaveStyle('display: none')
  //   expect(list[3]).toHaveStyle('display: none')
  //   expect(list[4]).toHaveStyle('display: none')
  //   expect(list[5]).toHaveStyle('display: none')
  //   expect(list[6]).toHaveStyle('display: none')
  //   expect(list[7]).toHaveStyle('display: none')
  //   expect(list[8]).toHaveStyle('display: none')
  // });
});
