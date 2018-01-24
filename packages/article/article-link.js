import React from "react";
import { Colours } from "@times-components/styleguide";
import { TextLink } from "@times-components/link";

const linkStyles = {
  color: Colours.linkBlue,
  fontFamily: "TimesDigitalW04-Regular",
  lineHeight: 26,
  fontSize: 17,
  marginBottom: 25,
  marginTop: 0
};

const ArticleLink = props => (
  <TextLink url={props.url} onPress={props.onPress} style={linkStyles}>
    {props.children}
  </TextLink>
);

ArticleLink.defaultProps = {
  ...TextLink.defaultProps
};

ArticleLink.propTypes = {
  ...TextLink.propTypes
};

export default ArticleLink;
