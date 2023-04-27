import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '../../../../utils/test-utils';
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
  it('calls the function on click', async () => {
    const setHamburgerActive = jest.fn();
    const { getByTestId } = render(
      <CustomHamburgerMenuContainer
        hamburgerActive={true}
        setHamburgerActive={setHamburgerActive}
      >
        <div>hi</div>
      </CustomHamburgerMenuContainer>
    );
    const Overlay = getByTestId('overlay');
    fireEvent.click(Overlay);
    expect(setHamburgerActive).toHaveBeenCalled();
  });
});
