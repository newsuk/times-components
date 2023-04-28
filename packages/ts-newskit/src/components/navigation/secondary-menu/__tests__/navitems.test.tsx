import React from 'react';
import { render } from '../../../../utils/test-utils';
import '@testing-library/jest-dom';
import { mainMenuItems } from '../fixtures/menu-items.json';
import { cleanup, fireEvent } from '@testing-library/react';
import { NavItems } from '../desktop/navItems';

const options = {
  handleSelect: jest.fn(),
  setIsExpanded: jest.fn(),
  isExpanded: false,
  isSelected: 'true'
};

const hasMenuItem = 3;
describe('Navitems Desktop', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render snapshot', () => {
    const { asFragment } = render(
      <NavItems
        data={mainMenuItems}
        options={options}
        hasMenuItem={hasMenuItem}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render the menu item', () => {
    const { getByText } = render(
      <NavItems
        data={mainMenuItems}
        options={options}
        hasMenuItem={hasMenuItem}
      />
    );
    const title = getByText('Home');
    expect(title).toBeInTheDocument();
  });
  it('items should have ancher with href', () => {
    const { getAllByTestId } = render(
      <NavItems
        data={mainMenuItems}
        options={options}
        hasMenuItem={hasMenuItem}
      />
    );
    const title = getAllByTestId('buttonLink')[0];
    expect(title).toHaveAttribute('href', '/home');
  });

  it('items should have ancher with href', () => {
    const { getAllByTestId } = render(
      <NavItems
        data={mainMenuItems}
        options={options}
        hasMenuItem={hasMenuItem}
      />
    );
    const title = getAllByTestId('buttonLink')[0];
    fireEvent.click(title);
    expect(options.handleSelect).toHaveBeenCalled();
  });
});
