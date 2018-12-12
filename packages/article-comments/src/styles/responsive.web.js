import styled from "styled-components";
import {
  breakpoints,
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

export const CommentContainer = styled.div`
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;

export const CommentEnabledGuidelines = styled.p`
  color: ${colours.functional.secondary};
  font-family: "${fonts.supporting}";
  font-size: ${fontSizes.commentsGuidelines}px;
  padding-bottom: ${spacing(-2)};
  padding-left: 7px;
  padding-top: ${spacing(6)};
`;

export const CommentDisabledGuidelines = styled.p`
  color: ${colours.functional.secondary};
  font-family: "${fonts.supporting}";
  font-size: ${fontSizes.commentsGuidelines}px;
  padding-bottom: ${spacing(1)};
  padding-top: ${spacing(1)};
  text-align: center;
`;

export const CommentDisabledHeadline = styled.p`
  color: ${colours.functional.primary};
  font-family: "${fonts.headline}";
  font-size: ${fontSizes.commentsHeadline}px;
  padding-bottom: ${spacing(1)};
  padding-top: ${spacing(6)};
  text-align: center;
`;
