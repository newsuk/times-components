import React from 'react';
import { customRender } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import { mainMenuItems } from '../fixtures/menu-items.json';
import { SecondaryNavDesktop } from '../desktop';
import { cleanup, fireEvent } from '@testing-library/react';

const handleSelect = jest.fn();

describe('Secondary Menu Desktop', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render snapshot', () => {
    const { asFragment } = customRender(
      <SecondaryNavDesktop
        data={mainMenuItems}
        isSelected="Home"
        handleSelect={handleSelect}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render the menu item', () => {
    const { getByText } = customRender(
      <SecondaryNavDesktop
        data={mainMenuItems}
        isSelected="Home"
        handleSelect={handleSelect}
      />
    );
    const title = getByText('Home');
    expect(title).toBeInTheDocument();
  });
  it('items should have ancher with href', () => {
    const { getAllByTestId } = customRender(
      <SecondaryNavDesktop
        data={mainMenuItems}
        isSelected="Home"
        handleSelect={handleSelect}
      />
    );
    const title = getAllByTestId('buttonLink')[0];
    expect(title).toHaveAttribute('href', '/home');
  });
  it('should call handleSelect when clicked', () => {
    const { getAllByTestId } = customRender(
      <SecondaryNavDesktop
        data={mainMenuItems}
        isSelected="Home"
        handleSelect={handleSelect}
      />
    );
    const Anchor = getAllByTestId('buttonLink')[0];
    fireEvent.click(Anchor);
    expect(handleSelect).toHaveBeenCalled();
  });
});
