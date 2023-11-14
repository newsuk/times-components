import React from 'react';
import { render } from '../../../../utils/test-utils';
import '@testing-library/jest-dom';
import { mainMenuItems } from '../fixtures/menu-items.json';
import { cleanup, fireEvent } from '@testing-library/react';
import { CreateMoreMenu } from '../desktop/create-more-menu';

const options = {
  handleSelect: jest.fn(),
  setIsExpanded: jest.fn(),
  isExpanded: false,
  isSelected: 'Puzzles'
};

const mockClickHandler = jest.fn();

describe('Create More Menu', () => {
  // beforeEach(() => {
  //   Object.defineProperty(window, 'innerWidth', {
  //     writable: true,
  //     configurable: true,
  //     value: 1000
  //   });
  // });
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render snapshot', () => {
    const { asFragment } = render(
      <CreateMoreMenu
        data={mainMenuItems}
        options={options}
        clickHandler={mockClickHandler}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render the menu item', () => {
    const { getByText } = render(
      <CreateMoreMenu
        data={mainMenuItems}
        options={options}
        clickHandler={mockClickHandler}
      />
    );
    const title = getByText('Puzzles');
    expect(title).toBeInTheDocument();
  });
  // it('items should have ancher with href', () => {
  //   const { getAllByTestId } = render(
  //     <CreateMoreMenu
  //       data={mainMenuItems}
  //       options={options}
  //       clickHandler={mockClickHandler}
  //     />
  //   );
  //   const title = getAllByTestId('buttonLink')[0];
  //   expect(title).toHaveAttribute('href', '/puzzles');
  // });

  it('items should have ancher with href', () => {
    const { getByText } = render(
      <CreateMoreMenu
        data={mainMenuItems}
        options={options}
        clickHandler={mockClickHandler}
      />
    );
    const title = getByText('Puzzles');
    fireEvent.click(title);
    expect(options.handleSelect).toHaveBeenCalled();
    expect(options.setIsExpanded).toHaveBeenCalled();
  });

  // it('items should have length of 2', () => {
  //   const { getAllByRole } = render(
  //     <CreateMoreMenu
  //       data={mainMenuItems}
  //       options={options}
  //       clickHandler={mockClickHandler}
  //     />
  //   );
  //   const list = getAllByRole('listitem');
  //   expect(list.length).toEqual(2);
  // });
  // it('items should have length of 8', () => {
  //   const { getAllByRole } = render(
  //     <CreateMoreMenu
  //       data={mainMenuItems}
  //       options={options}
  //       clickHandler={mockClickHandler}
  //     />
  //   );
  //   const list = getAllByRole('listitem');
  //   expect(list.length).toEqual(8);
  // });
});
