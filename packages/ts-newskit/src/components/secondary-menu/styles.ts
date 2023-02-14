import styled from 'styled-components';
import { Menu } from 'newskit';

export const MenuDivider = styled.hr`
  width: calc(100% - 64px);
  margin: auto;
  border: 1px solid #f5f5f5;
`;

export const MainMenu = styled(Menu)`
  ul {
    display: flex;
    justify-content: center;
  }

  & li span {
    font-size: 14px;
    line-height: 20px;
    font-family: 'Roboto-Medium';
    height: 20px;
    color: '#1D1D1B';
  }
`;

export const MenuItems = styled.div`
  margin-top: -2px;
  &:hover {
    background-color: rgba(245, 245, 245, 1);
    margin-top: -2px;
  }
`;

export const MenuWrapper = styled.div`
  height: 48px;
  display: flex;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding-left: 10px;
`;

export const MenuItemsWrapper = styled.div`
  display: flex;
  background-color: white;
  flex-direction: column;
`;

export const TextBlockWrapper = styled.div`
  margin-top: 16px;
  padding-left: 6px;
  background-color: rgba(245, 245, 245, 1);
`;
