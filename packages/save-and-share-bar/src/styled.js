import {
  Button,
  Popover,
  Stack,
  getMediaQueryFromTheme,
  styled
} from "newskit";

export const StyledButton = styled(Button)`
  border-radius: 0;
  border-color: #333333;
  color: #333333;
`;

export const IconActivityIndicatorContainer = styled.div`
  div {
    height: 16px;
    width: 16px;
  }
`;

export const StyledPopover = styled(Popover)`
  ${getMediaQueryFromTheme("xs", "md")} {
    left: 5%;
  }
`;

export const PopoverContent = styled(Stack)`
  gap: 24px;
`;
