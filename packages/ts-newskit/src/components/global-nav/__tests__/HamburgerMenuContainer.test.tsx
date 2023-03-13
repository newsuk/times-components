import React from 'react';
import '@testing-library/jest-dom';
import { render } from '../../utils/test-utils';
import { CustomHamburgerMenuContainer } from '../HamburgerMenuContainer';

describe('HamburgerMenuContainer', () => {
  it('Wraps the hamburger menu', () => {
    const { asFragment } = render(
      <CustomHamburgerMenuContainer
        setHamburgerActive={jest.fn}
        hamburgerActive={false}
      >
        <div>hi</div>
      </CustomHamburgerMenuContainer>
    );
    expect(asFragment()).toBeTruthy();
  });
});
