import React from 'react';
import '@testing-library/jest-dom';
import { mainMenuItems } from '../fixtures/menu-items.json';
import { SecondaryNavDesktop } from '../desktop';
import { fireEvent } from '@testing-library/react';
import { BreakpointKeys } from 'newskit';
import { renderComponent } from '../../../../utils';

const options = {
  handleSelect: jest.fn(),
  setIsExpanded: jest.fn(),
  isExpanded: false,
  isSelected: 'Home'
};

const mockClickHandler = jest.fn();

describe('Secondary Menu Desktop', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  const renderSecodaryNav = (size: BreakpointKeys = 'xl') =>
    renderComponent(
      <SecondaryNavDesktop
        data={mainMenuItems}
        options={options}
        clickHandler={mockClickHandler}
      />,
      size
    );

  it('should render snapshot', () => {
    const { asFragment } = renderSecodaryNav();
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render the menu item', () => {
    const { getAllByText } = renderSecodaryNav();
    const title = getAllByText('Home')[0];
    expect(title).toBeInTheDocument();
  });
  it('items should have ancher with href', () => {
    const { getAllByTestId } = renderSecodaryNav();
    const title = getAllByTestId('buttonLink')[0];
    expect(title).toHaveAttribute('href', '/home');
  });
  it('should call handleSelect when clicked', () => {
    const { getAllByTestId } = renderSecodaryNav();
    const Anchor = getAllByTestId('buttonLink')[0];
    fireEvent.click(Anchor);
    expect(options.handleSelect).toHaveBeenCalled();
  });
  it('should render all navitems', () => {
    const { getAllByRole } = renderSecodaryNav();
    const list = getAllByRole('listitem');
    expect(list[0]).toBeVisible();
    expect(list[8]).toBeVisible();
  });
  it('should change the width of menu divider when screen size change', () => {
    const { getAllByTestId } = renderSecodaryNav();
    const hr = getAllByTestId('divider')[0];
    expect(hr).toHaveStyle('width: 100%');
  });
});
