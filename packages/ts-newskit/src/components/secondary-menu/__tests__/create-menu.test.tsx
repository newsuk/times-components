import React from 'react';
import { render } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import { mainMenuItems } from '../fixtures/menu-items.json';
import { cleanup } from '@testing-library/react';
import { CreateMenu } from '../desktop/create-menu';
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
});
