import React from 'react';
import { render } from '../../../../utils/test-utils';
import '@testing-library/jest-dom';
import { mainMenuItems } from '../fixtures/menu-items.json';
import { cleanup } from '@testing-library/react';
import { SecondaryNavMobile } from '../mobile';
import { options } from '../fixtures/options';

jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('sm')
}));

describe('Secondary Menu', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render snapshot', () => {
    const { asFragment } = render(
      <SecondaryNavMobile
        data={mainMenuItems}
        options={options}
        onClick={() => {
          // noop
        }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
