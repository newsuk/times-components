import styled from "styled-components";
import {
  breakpoints,
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

export const ParagraphContainer = styled.div`
  padding-left: ${spacing(2)};
  padding-right: ${spacing(2)};

  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
    margin: 0 auto;
    padding-left: 0;
    padding-right: 0;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;

export const Paragraph = styled.p`
  color: ${colours.functional.primary};
  font-family: "${fonts.bodyRegular}";
  line-height: 26px;
  font-size: ${fontSizes.bodyMobile}px;
  margin-bottom: ${spacing(5)};
  margin-top: 0;
  display: block;

  @media (min-width: ${breakpoints.medium}px) {
    font-size: ${fontSizes.body}px;
    line-height: 30px;
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
