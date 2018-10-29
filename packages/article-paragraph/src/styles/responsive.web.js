import styled from "styled-components";
import {
  breakpoints,
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

export const Paragraph = styled.p`
  color: ${colours.functional.primary};
  display: block;
  font-family: "${fonts.bodyRegular}";
  line-height: 26px;
  font-size: ${fontSizes.bodyMobile}px;
  margin: 0 auto ${spacing(5)};
  padding-right: ${spacing(2)};
  padding-left: ${spacing(2)};

  @media (min-width: ${breakpoints.medium}px) {
    font-size: ${fontSizes.body}px;
    line-height: 30px;
    padding-left: 0;
    padding-right: 0;
    width: 80.8%;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;

export const DropCap = styled.span`
  float: left;
  -webkit-margin-before: 11px !important;
  padding: 9px 10px 0 0;
  line-height: 0.6em;
  font-size: ${fontSizes.dropCap}px;
  font-family: "${fonts.dropCap}";
  color: ${colours.functional.primary};
`;
