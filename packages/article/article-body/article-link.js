import React from "react";
import { TextLink } from "@times-components/link";
import { colours, fonts, spacing } from "@times-components/styleguide";

const linkStyles = {
  color: colours.functional.action,
  fontFamily: fonts.bodyRegular,
  lineHeight: 26,
  fontSize: 17,
  marginBottom: spacing.l,
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
