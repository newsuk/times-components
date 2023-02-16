import React from 'react';
import { customRender } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import { mainMenuItems } from '../fixtures/menu-items.json';
import { SecondaryNavDesktop } from '../desktop';
import { cleanup } from '@testing-library/react';

describe('Secondary Menu Mobile', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render the menu', () => {
    const { asFragment } = customRender(
      <SecondaryNavDesktop
        data={mainMenuItems}
        isSelected="Home"
        handleSelect={() => alert('test')}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
