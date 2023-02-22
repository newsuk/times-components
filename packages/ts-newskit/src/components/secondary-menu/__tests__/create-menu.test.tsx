import React from 'react';
import { render } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import { mainMenuItems } from '../fixtures/menu-items.json';
import { cleanup, fireEvent } from '@testing-library/react';
import { CreateMenu } from '../desktop/create-menu';
import { useBreakpointKey } from 'newskit';
jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('xl')
}));
const handleSelect = jest.fn();
const setIsExpanded = jest.fn();
const isExpanded = false;

describe('Create Menu', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render snapshot', () => {
    const { asFragment } = render(
      <CreateMenu
        data={mainMenuItems}
        isSelected="Home"
        handleSelect={handleSelect}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should expand on click', () => {
    (useBreakpointKey as any).mockReturnValue('md');
    const { getByText } = render(
      <CreateMenu
        data={mainMenuItems}
        isSelected="Home"
        handleSelect={handleSelect}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
    );
    expect(getByText('See all')).toBeVisible();
    const seeAllButton = getByText('See all');
    fireEvent.click(seeAllButton);
    expect(setIsExpanded).toHaveBeenCalled();
  });
});
