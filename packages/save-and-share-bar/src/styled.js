import {
  Button,
  Popover,
  Stack,
  getMediaQueryFromTheme,
  styled
} from "newskit";

export const StyledButton = styled(Button)`
  position: relative;
  border-radius: 0;
  border-color: #333333;
  color: #333333;
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
    border-width: 0.15em;
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

export const StyledPopover = styled(Popover)`
  ${getMediaQueryFromTheme("xs", "md")} {
    left: 5%;
  }
  box-shadow: 0px -20px 32px 0px #11111114, 0px 4px 4px 0px #00000040 !important;
`;

export const PopoverContent = styled(Stack)`
  gap: 24px;
`;

export const AudioButton = styled.div`
  width: 100px;
  height: 100px;
  background-color: #cc0000;
`;
