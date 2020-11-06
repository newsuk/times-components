import React from "react";
import { TextLink } from "@times-components/link";
import {
  CommentContainer,
  CommentDisabledHeadline,
} from "./styles/responsive";

const DisabledComments = () => (
  <CommentContainer>
    <CommentDisabledHeadline>
      Comments for this article have been turned off
    </CommentDisabledHeadline>
  </CommentContainer>
);

export default DisabledComments;
