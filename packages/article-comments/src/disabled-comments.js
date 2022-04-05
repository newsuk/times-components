import React from "react";
import { TextLink } from "@times-components/link";
import {
  CommentContainer,
  CommentDisabledHeadline,
  CommentDisabledGuidelines
} from "./styles/responsive";
import styles from "./styles";

const DisabledComments = () => (
  <CommentContainer>
    <CommentDisabledHeadline>
      Comments for this article have been turned off
    </CommentDisabledHeadline>
    <CommentDisabledGuidelines>
      Comments are subject to our community guidelines, which can be viewed{" "}
      <TextLink
        style={styles.link}
        url="https://www.thetimes.co.uk/article/f4024fbe-d989-11e6-9063-500e6740fc32"
      >
        here
      </TextLink>
      .
    </CommentDisabledGuidelines>
  </CommentContainer>
);

export default DisabledComments;
