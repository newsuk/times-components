import { TcView } from "@times-components/utils";
import styled from "styled-components";
import {
  breakpoints,
  colours,
  fontsWithFallback,
  fontSizes
} from "@times-components/ts-styleguide";

export const HeadlineContainer = styled.h1`
  border: 0px solid black;
  box-sizing: border-box;
  display: inline;
  padding: 0px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  font-size: ${fontSizes.headline}px;
  color: ${colours.functional.brandColour};
  margin: 0 0 8px 0;
  font-family: ${fontsWithFallback.headline};
  font-weight: 400;
  line-height: 30px;
  ${props => props.styles && props.styles}

  @media (min-width: ${breakpoints.medium}px) {
    font-size: ${fontSizes.articleHeadline}px;
    line-height: 45px;
  }
`;

export const LabelContainer = styled(TcView)`
  @media (min-width: ${breakpoints.wide}px) {
    margin-top: 0px;
  }
`;
