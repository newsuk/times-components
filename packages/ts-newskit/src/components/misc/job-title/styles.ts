import styled from 'styled-components';

export const IconButton = styled.button`
  margin: 0;
  padding: 0;
  display: inline-grid;
  column-gap: 8px;
  grid-template-columns: repeat(1, auto);
  width: 32px;
  height: 32px;
  margin-inline-start: 8px;
  padding-inline: 8px;
  padding-block: 8px;
  box-sizing: border-box;
  overflow: hidden;
  border: none;
  appearance: none;
  background-color: #00000000;
  border-radius: 50%;
  color: #333333;
  cursor: pointer;
`;

export const Popover = styled.div`
  position: relative;
  display: inline-block;
`;
export const PopoverContext = styled.div<{ isOpen?: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'grid' : 'none')};
  position: absolute;
  top: -55px;
  left: 4px;
  box-shadow: 0px 20px 32px 0px #11111114;
  border-radius: 0px;
  border-style: none;
  z-index: 80;

  div {
    margin: 0;
    color: #333333;
    border-radius: 0px;
    background-color: #ffffff;
    white-space: nowrap;

    display: grid;
    grid-template-areas:
      'header close'
      'content content';
    grid-template-columns: 1fr auto;
    grid-template-rows: auto 1fr;

    /* Pointer Arrow */
    &::after {
      content: '';
      position: absolute;
      -webkit-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
      box-sizing: border-box;
      background-color: #ffffff;
      width: 16px;
      height: 16px;
      left: 12px;
      bottom: calc(-16px / 2);
    }
  }
`;

export const PopoverHeader = styled.div`
  div {
    display: flex;
    grid-area: header;
    align-items: center;
    box-sizing: border-box;
    box-shadow: 0px 20px 32px 0px #11111114;
    border-radius: 0px;
    border-style: none;
    font-family: Roboto;
    font-size: 1.4000000000000001rem;
    line-height: 1.5;
    font-weight: 500;
    letter-spacing: 0em;
    padding-inline: 24px;
    padding-block: 16px;
  }
`;

export const CloseButton = styled.button`
  height: 48px;
  width: 48px;
  border-radius: 50%;
  padding: 16px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s;
  &:focus-visible {
    background-color: #eeeeee;
    border: 1px solid #000;
  }
  &:hover {
    background-color: #eeeeee;
  }
`;

export const Tooltip = styled.div`
  position: relative;
  display: inline-block;
  z-index: 80;
`;
export const TooltipContext = styled.div<{ isOpen?: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'grid' : 'none')};
  position: absolute;
  top: -34px;
  left: 8px;
  grid-template-areas:
    'header close'
    'content content';
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr;

  color: rgb(255, 255, 255);
  background-color: rgb(17, 17, 17);
  font-family: 'Roboto';
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  letter-spacing: 0em;
  padding-inline: 8px;
  padding-block: 8px;
  white-space: nowrap;

  /* Pointer Arrow */
  &::after {
    content: '';
    position: absolute;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    box-sizing: border-box;
    background-color: #ffffff;
    width: 4px;
    height: 4px;
    left: 14px;
    bottom: calc(-4px / 2);
    box-sizing: border-box;
    background-color: rgb(17, 17, 17);
  }
`;
