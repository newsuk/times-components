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

export const CommentGuidelines = styled.p`
  color: ${colours.functional.secondary};
  font-family: "${fonts.supporting}";
  font-size: ${fontSizes.commentsGuidelines}px;
  margin-bottom: ${spacing(-2)};
  margin-left: 7px;
  margin-top: ${spacing(5)};
`;
