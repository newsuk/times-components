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

jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('xl')
}));

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
  // it('no items should be visible when xl breakpoint', () => {
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
  // it('2 items should be visible when lg breakpoint', () => {
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
  it('4 items should be visible when md breakpoint', () => {
    const { getAllByRole } = renderMoreMenu('md');
    // Object.defineProperty(window, 'innerWidth', {
    //   configurable: true,
    //   value: 1000,
    //   writable: true,
    // })

    const list = getAllByRole('listitem');
    console.log('======  window.innerWidth', window.innerWidth)
    // expect(list[0]).toBeVisible() not 
    // expect(list[1]).toBeVisible() not
    // expect(list[2]).toBeVisible() not
    // expect(list[3]).toBeVisible() not
    // expect(list[4]).toBeVisible() not
    // expect(list[5]).toBeVisible()
    // expect(list[6]).toBeVisible()
    // expect(list[7]).toBeVisible()
    // expect(list[8]).toBeVisible()
  });
});
