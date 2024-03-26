import { styled, LinkStandalone } from "newskit";

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
