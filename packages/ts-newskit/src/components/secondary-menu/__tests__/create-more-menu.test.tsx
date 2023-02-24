import React from 'react';
import { render } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import { mainMenuItems } from '../fixtures/menu-items.json';
import { cleanup, fireEvent } from '@testing-library/react';
import { CreateMoreMenu } from '../desktop/create-more-menu';
import { useBreakpointKey } from 'newskit';

jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('xl')
}));

const options = {
  handleSelect: jest.fn(),
  setIsExpanded: jest.fn(),
  isExpanded: false,
  isSelected: 'Puzzles'
};

describe('Create More Menu', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render snapshot', () => {
    (useBreakpointKey as any).mockReturnValue('md');
    const { asFragment } = render(
      <CreateMoreMenu data={mainMenuItems} options={options} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render the menu item', () => {
    const { getByText } = render(
      <CreateMoreMenu data={mainMenuItems} options={options} />
    );
    const title = getByText('Puzzles');
    expect(title).toBeInTheDocument();
  });
  it('items should have ancher with href', () => {
    const { getAllByTestId } = render(
      <CreateMoreMenu data={mainMenuItems} options={options} />
    );
    const title = getAllByTestId('buttonLink')[0];
    expect(title).toHaveAttribute('href', '/puzzles');
  });

  it('items should have ancher with href', () => {
    const { getByText } = render(
      <CreateMoreMenu data={mainMenuItems} options={options} />
    );
    const title = getByText('Puzzles');
    fireEvent.click(title);
    expect(options.handleSelect).toHaveBeenCalled();
    expect(options.setIsExpanded).toHaveBeenCalled();
  });

  it('items should have length of 2', () => {
    (useBreakpointKey as any).mockReturnValue('md');
    const { getAllByRole } = render(
      <CreateMoreMenu data={mainMenuItems} options={options} />
    );
    const list = getAllByRole('listitem');
    expect(list.length).toEqual(2);
  });
  it('items should have length of 8', () => {
    (useBreakpointKey as any).mockReturnValue('lg');
    const { getAllByRole } = render(
      <CreateMoreMenu data={mainMenuItems} options={options} />
    );
    const list = getAllByRole('listitem');
    expect(list.length).toEqual(8);
  });
});
