import {
  styled,
  LinkStandalone,
  Button,
  getMediaQueryFromTheme,
  Stack,
  Popover
} from 'newskit';

export const StyledButton = styled(Button)`
  border-radius: 0;
  border-color: #333333;
  color: #333333;
`;

export const StyledPopover = styled(Popover)`
  ${getMediaQueryFromTheme('xs', 'md')} {
    left: 5%;
  }
  box-shadow: 0px -20px 32px 0px #11111114, 0px 4px 4px 0px #00000040 !important;
`;

export const PopoverContent = styled(Stack)`
  gap: 24px;
`;

export const StyledLinkStandalone = styled(LinkStandalone)`
  cursor: pointer;
  &:hover {
    text-decoration: none !important;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

export const IconActivityIndicatorContainer = styled.div`
  div {
    height: 16px;
    width: 16px;
    border-right-color: #333333;
    border-width: 0.15em;
  }
`;
