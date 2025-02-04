import styled from "styled-components";
import {
  breakpoints,
  colours,
  fontsWithFallback,
  fontSizes,
  spacing
} from "@times-components/ts-styleguide";


export const StyledUl = styled.ul`

  padding-left: ${spacing(5)};
  padding-right: ${spacing(2)};

  @media (min-width: ${breakpoints.medium}px) {
    font-size: ${fontSizes.body}px;
    line-height: 30px;
    width: 80.8%;
    margin: 0 auto ${spacing(5)};
    padding-right: ${spacing(2)};
    padding-left: ${spacing(3)};
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
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
