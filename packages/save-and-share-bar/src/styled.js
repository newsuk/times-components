import styled from "styled-components";

export const SaveAndShareBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  height: 100%;
`;

export const ShareButtonContainer = styled.div`
  position: relative;
`;

export const OutlineButton = styled.button`
  position: relative;
  height: 32px;
  min-width: 84px;
  padding: 8px 12px 8px 12px;

  background-color: ${({ isPopoverOpen }) =>
    isPopoverOpen ? "#EEEEEE" : "#fff"};
  color: #333333;

  font-size: 14px;
  font-family: Roboto, sans-serif;
  font-weight: 500;

  cursor: pointer;
  outline: none;
  border: 0.5px solid #000;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  transition: background-color 0.2s;

  ${({ isLoading }) =>
    isLoading &&
    `
      border: none;
      background-color: #eeeeee;
      cursor: default;
    `};

  &:hover {
    background-color: #eeeeee;
  }

  &:focus-visible {
    outline: 2px solid #00527a;
    outline-offset: 2px;
    background-color: #eeeeee;
  }

  &:active {
    background-color: #eeeeee;
  }
`;

export const Popover = styled.div`
  position: absolute;
  ${({ position }) => (position === "top" ? "top: 0" : "bottom: 0")};
  left: 0;
  right: 12px;
  transform: ${({ position }) =>
    position === "top"
      ? "translateY(calc((100% + 10px) * -1))"
      : "translateY(calc((100% + 10px)))"};

  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;

  background-color: #fff;
  box-shadow: 0px -20px 32px 0px #11111114, 0px 4px 4px 0px #00000040;

  z-index: 99;

  width: calc(100vw - 24px);
  max-width: 450px;

  /* Pointer Arrow */
  &::after {
    content: "";
    position: absolute;
    ${({ position }) =>
      position === "top"
        ? `
      bottom: -16px;
      transform: rotate(180deg);
    `
        : `
    top: -16px;
    `};
    left: 36px;
    border-width: 8px;
    border-style: solid;
    border-color: transparent transparent #fff transparent;
  }
`;

export const PopoverHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  border-bottom: 1px solid #e4e4e4;

  h3 {
    font-family: Roboto;
    font-size: 18px;
    font-weight: 500;
    margin: 0;
    padding: 24px;
  }

  button {
    margin: 8px;
  }
`;

export const PopoverContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 24px;
  padding: 24px;

  @media (max-width: 449px) {
    flex-direction: column;
    align-items: flex-start;
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

export const IconActivityIndicatorContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  div {
    height: 16px;
    width: 16px;
    border-right-color: #333333;
    border-width: 0.125em;
  }
`;

export const EmailSpinnerContainer = styled.div`
  div {
    height: 16px;
    width: 16px;
    border-right-color: #00527a;
    border-width: 0.15em;
  }
`;
