import React from 'react';
import { render } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import { mainMenuItems } from '../fixtures/menu-items.json';
import { cleanup, fireEvent } from '@testing-library/react';
import { CreateMenu } from '../desktop/create-menu';
import { useBreakpointKey } from 'newskit';
import { getWidth } from '../../utils/getWidth';

jest.mock('../../utils/getWidth', () => ({
  getWidth: jest.fn(el => el.clientWidth)
}));

jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('xl')
}));

const options = {
  handleSelect: jest.fn(),
  setIsExpanded: jest.fn(),
  isExpanded: true,
  isSelected: 'Home'
};
const setMoreMenuItemsLength = jest.fn(() => 0);
const setHasMenuItem = jest.fn(() => 0);

describe('Create Menu', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    cleanup();
  });

  it('should render snapshot', () => {
    const { asFragment } = render(
      <CreateMenu data={mainMenuItems} options={options} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should expand on click', () => {
    (useBreakpointKey as any).mockReturnValue('md');
    const { getByText } = render(
      <CreateMenu data={mainMenuItems} options={options} />
    );
    expect(getByText('See all')).toBeVisible();
    const seeAllButton = getByText('See all');
    fireEvent.click(seeAllButton);
    expect(options.setIsExpanded).toHaveBeenCalled();
  });
  it('should expand on click', async () => {
    (useBreakpointKey as any).mockReturnValue('md');
    render(<CreateMenu data={mainMenuItems} options={options} />);
    const navListContainerWidth = {
      clientWidth: 0
    };
    const navListWidth = {
      clientWidth: 0
    };
    expect(await getWidth(navListContainerWidth)).toBe(0);
    expect(await getWidth(navListWidth)).toBe(0);
    expect(setMoreMenuItemsLength).not.toHaveBeenCalled();
    expect(setHasMenuItem).not.toHaveBeenCalled();
  });
});
