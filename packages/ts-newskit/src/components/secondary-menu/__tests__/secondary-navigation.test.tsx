import React from 'react';
import { customRender } from '../../utils/test-utils';
import '@testing-library/jest-dom';
import { mainMenuItems } from '../fixtures/menu-items.json';
import { SecondaryNavigation } from '../index';
import { cleanup } from '@testing-library/react';

describe('Secondary Menu', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render snapshot', () => {
    const { asFragment } = customRender(
      <SecondaryNavigation data={mainMenuItems} title="Home" isActive={true} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
