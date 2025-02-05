import styled from "styled-components";
import {
  colours,
  fontsWithFallback,
  fontSizes,
  spacing
} from "@times-components/ts-styleguide";

export const StyledUl = styled.ul`
  padding-left: ${spacing(4)};
`;

export const StyledLi = styled.li`
  margin-bottom: 16px;
  list-style: square;
  color: ${colours.functional.primary};
  font-family: ${fontsWithFallback.bodyRegular};
  line-height: 26px;
  font-size: ${fontSizes.bodyMobile}px;
  p {
    width: 100% !important;
    margin-block-start: 16px;
    margin-block-end: 0;
    &:empty {
      display: none;
    }
  }
`;
