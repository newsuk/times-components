import styled, { css } from "styled-components";
import {
  breakpoints,
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

const dropCapFontSizes = {
  cultureMagazine: 104,
  dropCap: 110,
  stMagazine: 105,
  styleMagazine: 103
};

const lineHeights = {
  cultureMagazine: 0.85,
  dropCap: 0.55,
  stMagazine: 0.7,
  styleMagazine: 0.8
};

const dropCapMargins = {
  cultureMagazine: -0.06,
  dropCap: 0.2,
  stMagazine: 0.065,
  styleMagazine: -0.01
};

export const Paragraph = styled.p`
  color: ${colours.functional.primary};
  display: block;
  font-family: "${fonts.bodyRegular}";
  line-height: 26px;
  font-size: ${fontSizes.bodyMobile}px;
  margin: 0 auto ${spacing(5)};
  padding-right: ${spacing(2)};
  padding-left: ${spacing(2)};
   
  // Clear fix for floated dropcap
  &:first-of-type:after {
    content: "";
    clear: both;
    display: table;
  }

  @media (min-width: ${breakpoints.medium}px){ 
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
  color: ${colours.functional.primary};
  padding-right: 10px;
  line-height: 1em;

  ${({ font = "dropCap" }) => css`
    margin-top: ${dropCapMargins[font]}em;
    line-height: ${lineHeights[font]}em;
    font-size: ${dropCapFontSizes[font]}px;
    font-family: "${fonts[font]}";
  `};
`;
