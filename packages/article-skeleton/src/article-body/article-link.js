import React from "react";
import PropTypes from "prop-types";
import Context from "@times-components/context";
import { TextLink } from "@times-components/link";
import styleFactory from "../styles/article-body";
import articleLinkTrackingEvents from "./article-link-tracking-events";

const ArticleLink = props => (
  <Context.Consumer>
    {({ theme: { scale } }) => {
      const styles = styleFactory(scale);
      return (
        <TextLink
          onPress={props.onPress}
          style={styles.articleLink}
          url={props.url}
        >
          {props.children}
        </TextLink>
      );
    }}
  </Context.Consumer>
);

ArticleLink.defaultProps = {
  ...TextLink.defaultProps,
  linkType: ""
};

ArticleLink.propTypes = {
  ...TextLink.propTypes,
  linkType: PropTypes.string
};
export default articleLinkTrackingEvents(ArticleLink);
