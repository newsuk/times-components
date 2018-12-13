import React from "react";
import {
  CommentContainer,
  CommentDisabledHeadline,
  CommentDisabledGuidelines
} from "./styles/responsive";

const DisabledComments = () => (
  <CommentContainer>
    <CommentDisabledHeadline>
      Comments for this article have been turned off
    </CommentDisabledHeadline>
    <CommentDisabledGuidelines>
      Comments are subject to our community guidelines, which can be viewed{" "}
      <a href="//www.thetimes.co.uk/article/f4024fbe-d989-11e6-9063-500e6740fc32">
        here
      </a>
      .
    </CommentDisabledGuidelines>
  </CommentContainer>
);

export default DisabledComments;
