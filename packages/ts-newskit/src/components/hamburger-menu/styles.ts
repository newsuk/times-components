import { Menu, styled, Button, TextBlock } from 'newskit';

export const StyledButton = styled(Button)<{ isSelected: boolean }>`
  border-bottom: ${({ isSelected }) =>
    isSelected
      ? '2px solid #FFFFFF !important'
      : '2px solid #C2C2C2 !important'};
  width: 100%;
  font-family: Roboto-Regular;
  background: #151515;
`;

export const StyledTextBlock = styled(TextBlock)<{ isSelected: boolean }>`
  color: ${({ isSelected }) => (isSelected ? '#FFFFFF' : '#C2C2C2')};
  font-size: 15px;
`;

export const StyledMenu = styled(Menu)`
  ul {
    justify-content: space-around;
  }
  li {
    width: 100%;
    margin: 0px;
  }
`;

export const HamburgerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
`;

export const MenuNav = styled(Menu)`
  overflow-y: scroll;
  background-color: #151515;
  width: 320px;
  @media (min-width: 520px) {
    width: 520px;
  }
  @media (min-width: 768px) {
    width: 320px;
  }
`;
