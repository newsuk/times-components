import React from "react";
import Link from "@times-components/link";
import PropTypes from "prop-types";
import {
  linkStyles,
  dropCapLinkStyles
} from "../styles/article-body/article-link";
import withTrackEvents from "./article-link-tracking-events";

const ArticleLink = ({ children, target, url, onPress, dropCap }) => (
  <>
    {children.length === 0 ? (
      <>
        <Link
          responsiveLinkStyles={linkStyles}
          target={target}
          onPress={onPress}
          url={url}
        >
          {url}
        </Link>{" "}
      </>
    ) : (
      <Link
        underlined={!(dropCap && children[0].length === 1)}
        responsiveLinkStyles={dropCap ? dropCapLinkStyles : linkStyles}
        target={target}
        url={url}
        onPress={onPress}
      >
        {children}
      </Link>
    )}
  </>
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
