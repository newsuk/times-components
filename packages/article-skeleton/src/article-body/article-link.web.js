import React from "react";
import Link from "@times-components/link";
import { colours, fonts, fontSizes } from "@times-components/styleguide";
import PropTypes from "prop-types";
import withTrackEvents from "./article-link-tracking-events";

// SHOULD BE IN STYLES
const responsiveLinkStyles = {
  base: `
      color: ${colours.functional.action};
      font-family: "${fonts.bodyRegular}";
      line-height: 26px;
      font-size: ${fontSizes.bodyMobile}px;
      margin-bottom: 25px;
      margin-top: 0;
  `,
  medium: `
      font-size: ${fontSizes.body}px;
      line-height: 30px;
  `
};

const dropCapLinkStyles = {
  base: `
    font-size: inherit;
    text-decoration: none;
    color: ${colours.functional.action};
  `,
  medium: `
    font-size: inherit;
    text-decoration: none;
    color: ${colours.functional.action};
  `
};

const ArticleLink = ({ children, target, url, onPress, dropCap }) => (
  <Link
    underlined={!dropCap}
    responsiveLinkStyles={dropCap ? dropCapLinkStyles : responsiveLinkStyles}
    target={target}
    url={url}
    onPress={onPress}
  >
    {children}
  </Link>
);

ArticleLink.defaultProps = {
  ...Link.defaultProps,
  onPress: () => {},
  dropCap: false
};

ArticleLink.propTypes = {
  ...Link.propTypes,
  dropCap: PropTypes.bool
};
export default withTrackEvents(ArticleLink);
