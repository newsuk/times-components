import React from "react";
import { CommentContainer, CommentDisabledHeadline } from "./styles/responsive";

const DisabledComments = () => (
  <CommentContainer>
    <CommentDisabledHeadline>
      Comments for this article have been turned off
    </CommentDisabledHeadline>
  </CommentContainer>
);

export default DisabledComments;
