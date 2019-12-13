import React from "react";
import { Platform } from "react-native";
import { TextLink } from "@times-components/link";
import renderByline from "./render-byline";
import { propTypes, defaultProps } from "./article-byline-prop-types";
import styles from "./styles";
import withTrackEvents from '../tracking/with-track-events';

const renderAuthorComponent = (
  children,
  key,
  attributes,
  { onPress, className }
) => {
  const slug = attributes.slug;
  const url = `/profile/${slug}`;

  return (
    <TextLink
      className={className}
      key={key}
      onPress={(e) => {onPress(e, {slug, url})}}
      style={styles.link}
      url={url}
    >
      {children}
    </TextLink>
  );
};



const ArticleBylineWithLinks = ({ ast, centered, ...props }) =>
  renderByline(
    renderAuthorComponent,
    ast,
    // TODO: revert platform switch after design signoff
    centered && Platform.OS === "web"
      ? [styles.text, styles.centered]
      : styles.text,
    props
  );

ArticleBylineWithLinks.displayName = "ArticleBylineWithLinks";

ArticleBylineWithLinks.propTypes = propTypes;
ArticleBylineWithLinks.defaultProps = defaultProps;

export default withTrackEvents(ArticleBylineWithLinks);
