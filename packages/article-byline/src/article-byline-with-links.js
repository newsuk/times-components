import React from "react";
import { TextLink } from "@times-components/link";
import renderByline from "./render-byline";
import { propTypes, defaultProps } from "./article-byline-prop-types";
import styles from "./styles";

const renderAuthorComponent = (children, key, attributes, onAuthorPress) => {
  const url = `/profile/${attributes.slug}`;
  return {
    element: (
      <TextLink
        key={key}
        onPress={e => onAuthorPress(e, { slug: attributes.slug, url })}
        style={styles.link}
        url={url}
      >
        {children}
      </TextLink>
    )
  };
};

const ArticleBylineWithLinks = ({ ast, onAuthorPress }) =>
  renderByline(renderAuthorComponent, ast, styles.text, onAuthorPress);

ArticleBylineWithLinks.displayName = "ArticleBylineWithLinks";

ArticleBylineWithLinks.propTypes = propTypes;
ArticleBylineWithLinks.defaultProps = defaultProps;

export default ArticleBylineWithLinks;
