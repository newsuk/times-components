import { TcView } from "@times-components/utils";
import styled from "styled-components";
import { breakpoints, spacing } from "@times-components/ts-styleguide";

export const InsetCaptionContainerStyle = styled(TcView)`
  display: inline-block;
  margin-top: ${spacing(-2)};
  padding-bottom: ${spacing(4)};
  padding-left: ${spacing(2)};
  padding-right: ${spacing(2)};
  padding-top: 0;
  vertical-align: top;
  width: 50%;

  @media (min-width: ${breakpoints.medium}px) {
    clear: left;
    float: left;
    margin-top: 0px;
    padding-bottom: ${spacing(4)};
    padding-left: 0px;
    padding-top: 0px;
    padding-right: ${spacing(4)};
    width: 30%;
  }

  @media (min-width: ${breakpoints.wide}px) {
    padding-left: 0px;
    width: 35.71429%;
  }
`;

export const InsetImageStyle = styled(TcView)`
  display: inline-block;
  padding-bottom: ${spacing(4)};
  vertical-align: top;
  width: 50%;

  @media (min-width: ${breakpoints.medium}px) {
    clear: left;
    float: left;
    padding-bottom: 0px;
    padding-top: ${spacing(1)};
    padding-right: ${spacing(4)};
    width: 30%;
  }

  @media (min-width: ${breakpoints.wide}px) {
    clear: left;
    width: 35.71429%;
  }
`;

export const InsetCaptionStyle = styled(TcView)`
  padding-left: ${spacing(2)};

  @media (min-width: ${breakpoints.medium}px) {
    padding-left: 0px;
  }
`;

export const FullWidthCaptionContainer = styled.div`
  padding-left: ${spacing(2)};
  padding-right: ${spacing(2)};
  margin: auto;
  text-align: center;

  @media (min-width: ${breakpoints.medium}px) {
    padding-left: 0px;
    padding-right: 0px;
    width: 80.8%;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;
