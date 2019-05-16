import styled from "styled-components";
import {
  breakpoints,
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

const dropCapFontSizes = {
  cultureMagazine: 100,
  dropCap: 110,
  stMagazine: 110,
  styleMagazine: 110
};

const dropCapTopPaddings = {
  cultureMagazine: { bottom: 15, top: 0 },
  dropCap: { bottom: 0, top: 9 },
  stMagazine: { bottom: 10, top: 0 },
  styleMagazine: { bottom: 10, top: 0 }
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

export const dropCap = (font = "dropCap") => styled.span`
  float: left;
  -webkit-margin-before: 11px !important;
  padding: ${dropCapTopPaddings[font].top}px 10px ${
  dropCapTopPaddings[font].bottom
}px 0;
  line-height: 0.6em;
  font-size: ${dropCapFontSizes[font]}px;
  font-family: "${fonts[font]}";
  color: ${colours.functional.primary};
`;
