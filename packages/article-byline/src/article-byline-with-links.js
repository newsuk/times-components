/* eslint-disable react/prop-types, no-sequences, no-unused-expressions */
import React from "react";
import { TimesTextLink } from "@times-components/link";
import { checkStylesForUnits } from "@times-components/utils";
import renderByline from "./render-byline";
import { propTypes, defaultProps } from "./article-byline-prop-types";
import styles from "./styles";
import withTrackEvents from "../tracking/with-track-events";

const AuthorComponent = ({ slug, className, onAuthorPress, children }) => {
  const url = `/profile/${slug}`;
  const name = children[0];

  return (
    <TimesTextLink
      className={className}
      onPress={e => {
        onAuthorPress(e, { name, slug });
      }}
      style={checkStylesForUnits(styles.link)}
      url={url}
    >
      {children}
    </TimesTextLink>
  );
};

const ArticleBylineWithLinks = ({ ast, centered, ...props }) =>
  renderByline(
    withTrackEvents(AuthorComponent),
    ast,
    centered ? [styles.text, styles.centered] : styles.text,
    props
  );

ArticleBylineWithLinks.displayName = "ArticleBylineWithLinks";
ArticleBylineWithLinks.propTypes = propTypes;
ArticleBylineWithLinks.defaultProps = defaultProps;

export default ArticleBylineWithLinks;
