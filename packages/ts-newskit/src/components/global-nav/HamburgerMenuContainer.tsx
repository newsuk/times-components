import React, {ReactNode} from 'react';
import styled from 'styled-components';

const MenuDrawer = styled.div<{open: boolean}>`
  z-index: 100;
  position: absolute;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-in-out;
    width: 100%;
    height: 100%;
    @media screen and (min-width: 780px) {
      width: 320px
  }
`;

const Overlay = styled.div<{open: boolean}>`
  z-index: 99;
  position: absolute;
  width: 100%;
  height: 100vh;
  opacity: ${({ open }) => (open ? 1 : 0)};
  background-color: rgba(10, 10, 10, 0.8);
  transition-property: opacity;
  transition-duration: 200ms;
`;

export const CustomHamburgerMenuContainer: React.FC<{children: ReactNode, setHamburgerActive: (boolean: boolean) => void, hamburgerActive: boolean}> = ({ children, hamburgerActive, setHamburgerActive }) => (
    <>
      <Overlay onClick={() => setHamburgerActive(false)} open={hamburgerActive}/>
       <MenuDrawer open={hamburgerActive}>
        {children}
       </MenuDrawer>
    </>
  );