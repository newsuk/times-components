import React, { ReactNode } from 'react';
import { styled } from 'newskit';

const MenuDrawer = styled.div<{ open: boolean; isLoggedIn?: boolean }>`
  z-index: 1;
  top: ${({ isLoggedIn }) => (isLoggedIn ? '50px' : '114px')};
  position: absolute;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-in-out;
  width: 100%;
  height: 100%;
  @media screen and (min-width: 768px) {
    width: 320px;
    top: 60px;
  }
`;

const Overlay = styled.div<{ open: boolean }>`
  z-index: 0;
  position: absolute;
  width: ${({ open }) => (open ? '100%' : '0')};
  height: 100vh;
  opacity: ${({ open }) => (open ? 1 : 0)};
  background-color: rgba(10, 10, 10, 0.8);
  transition-property: opacity;
  transition-duration: 200ms;
`;

export const CustomHamburgerMenuContainer: React.FC<{
  children: ReactNode;
  setHamburgerActive: (arg: boolean) => void;
  hamburgerActive: boolean;
  isLoggedIn?: boolean;
}> = ({ children, hamburgerActive, setHamburgerActive, isLoggedIn }) => {
  return (
    <>
      <Overlay
        data-testid="overlay"
        onClick={() => setHamburgerActive(false)}
        open={hamburgerActive}
      />
      <MenuDrawer open={hamburgerActive} isLoggedIn={isLoggedIn}>
        {children}
      </MenuDrawer>
    </>
  );
};
