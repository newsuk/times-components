import styled from "styled-components";
import {
  breakpoints,
  colours,
  fontsWithFallback,
  fontSizes,
  spacing
} from "@times-components/ts-styleguide";

export const CommentContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-inline: ${spacing(4)};

  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;

export const CommentEnabledGuidelines = styled.p`
  color: ${colours.functional.secondary};
  font-family: ${fontsWithFallback.supporting};
  font-size: ${fontSizes.commentsGuidelines}px;
  margin: 0 0 ${spacing(-2)} 0;
  padding-left: 7px;
  padding-top: ${spacing(6)};
`;

export const CommentDisabledGuidelines = styled.p`
  color: #737373;
  font-family: ${fontsWithFallback.supporting};
  font-size: ${fontSizes.commentsGuidelines}px;
  line-height: 1.5;
  margin: 0;
  padding-bottom: ${spacing(6)};
  padding-top: ${spacing(1)};
  text-align: center;
`;

export const CommentDisabledHeadline = styled.p`
  color: ${colours.functional.primary};
  font-family: ${fontsWithFallback.headlineLight};
  font-size: 20px;
  font-weight: 300;
  margin: 0;
  padding-bottom: ${spacing(1)};
  padding-top: ${spacing(6)};
  text-align: center;

  @media (min-width: ${breakpoints.medium}px) {
    font-size: 22px;
  }

  @media (min-width: ${breakpoints.wide}px) {
    font-size: ${fontSizes.commentsHeadline}px;
  }
`;

export const Divider = styled.hr`
  margin: 4px auto 4px;
  max-width: 522px;
  width: 100%;
  border: none;
  border-top: 1px solid #e4e4e4;
`;
