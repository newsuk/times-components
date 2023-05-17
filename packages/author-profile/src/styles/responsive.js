import { TcView } from "@times-components/utils";
import styled from "styled-components";
import {
  breakpoints,
  colours,
  fontsWithFallback,
  fontSizes,
  spacing
} from "@times-components/ts-styleguide";

export const AuthorHeadWrapper = styled(TcView)`
  width: 100%;
  padding-top: 30px;

  @media (min-width: ${breakpoints.medium}px) {
    padding-top: 60px;
  }
`;

export const AuthorNameWrapper = styled.h1`
  border: 0px solid black;
  box-sizing: border-box;
  display: inline;
  margin: 0px;
  margin-bottom: 12px;
  padding: 0px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  color: ${colours.functional.brandColour};
  font-family: ${fontsWithFallback.headline};
  font-size: ${fontSizes.headline}px;

  @media (min-width: ${breakpoints.medium}px) {
    font-size: ${fontSizes.articleHeadline}px;
    margin-bottom: 14px;
  }
`;

export const BioContainer = styled(TcView)`
  width: 100%;
  padding-left: ${spacing(2)};
  padding-right: ${spacing(2)};
  padding-top: 6px;
  @media (min-width: ${breakpoints.medium}px) {
    padding-left: 0;
    padding-right: 0;
    max-width: 680px;
    padding-top: 16px;
  }

  @media (min-width: ${breakpoints.huge}px) {
    max-width: 760px;
  }
`;

export const ImageContainer = styled(TcView)`
  width: 100%;
  margin-bottom: 14px;
  @media (min-width: ${breakpoints.medium}px) {
    margin-bottom: 23px;
  }
`;

export const AuthorProfileHeadJobTitleContainer = styled.h2`
  border: 0px solid black;
  box-sizing: border-box;
  color: rgb(0, 0, 0);
  display: inline;
  font-size: 14px;
  font-family: sans-serif;
  margin: 0px;
  padding: 0px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;
