import styled, { keyframes } from "styled-components";
import { TcView } from "@times-components/utils";
import sharedStyles from "./shared";

const styles = (scale, breakpoint) => ({
  ...sharedStyles(scale, breakpoint),
  messageManager: {
    ...sharedStyles(scale, breakpoint).messageManager,
    position: "fixed",
    left: 0
  }
});

const AnimationIn = keyframes`
0% { transform: translateY(-51px)}
90% { transform: translateY(5px)}
100% { transform: translateY(0px)}
`;

const AnimationOut = keyframes`
0% { transform: translateY(0px)}
100% { transform: translateY(-51px)}
`;

export const StyledAnimation = styled(TcView)`
  animation-name: ${AnimationIn};
  animation-duration: 0.25s;
  animation-timing-function: ease-in-out;
  &.close {
    transform: translateY(-51px);
    animation-name: ${AnimationOut};
    animation-duration: 0.25s;
  }
`;

export const CloseButton = styled.button`
  cursor: pointer;
  &.active {
    opacity: 0.5;
  }
  :active {
    opacity: 0.5;
  }
`;

export default styles;
