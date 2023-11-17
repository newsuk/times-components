import React from 'react';
import '@testing-library/jest-dom';
import { mainMenuItems } from '../fixtures/menu-items.json';
import { cleanup, fireEvent } from '@testing-library/react';
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
    cleanup();
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
  // investigate : mock screen width
  // it('items should have length of 9', () => {
  //   const { getAllByRole } = renderMoreMenu();
  //   const list = getAllByRole('listitem');
  //   expect(list.length).toEqual(9);
  // });
  // it('items should have length of 9', () => {
  //   const { getAllByRole } = renderMoreMenu('lg');
  //   const list = getAllByRole('listitem');
  //   expect(list.length).toEqual(9);
  // });
  // it('items should have length of 9', () => {
  //   const { getAllByRole } = renderMoreMenu('md');
  //   const list = getAllByRole('listitem');
  //   expect(list.length).toEqual(9);
  // });
});
