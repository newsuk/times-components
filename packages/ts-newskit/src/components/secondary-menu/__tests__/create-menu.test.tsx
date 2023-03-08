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

const options = {
  handleSelect: jest.fn(),
  setIsExpanded: jest.fn(),
  isExpanded: true,
  isSelected: 'Home'
};

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
});
