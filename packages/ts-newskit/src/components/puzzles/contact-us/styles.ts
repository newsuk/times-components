import { GridLayoutItem, styled, LinkStandalone, LinkProps } from 'newskit';
import { NewsKitPhoneIcon } from '../../../assets';

export const StyledGridLayoutItem = styled(GridLayoutItem)`
  position: relative;
`;

export const StyledPhoneIcon = styled(NewsKitPhoneIcon)`
  position: absolute;
  top: 35px;
  right: 16px;
`;

export const PhoneLink = styled(LinkStandalone)<LinkProps>`
  & span {
    display: block;
  }
  :last-child {
    border-top: 0px;
  }
`;
