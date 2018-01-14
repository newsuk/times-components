import React from "react";
import { TextLink } from "@times-components/link";

const linkStyles = {
  color: "#069",
  fontFamily: "TimesDigitalW04-Regular",
  lineHeight: 26,
  fontSize: 17,
  marginBottom: 25,
  marginTop: 0
};

const ArticleLink = props => (
  <TextLink url={props.href} onPress={() => {}} style={linkStyles}>
    {props.linkText}
  </TextLink>
);

ArticleLink.defaultProps = {
  ...TextLink.defaultProps
};

export default ArticleLink;
