import React from "react";
import { TextLink } from "@times-components/link";
import { getBylineStyles, renderByline } from "./utils";
import { propTypes, defaultProps } from "./article-byline-prop-types";

const renderAuthorComponent = (
  children,
  bylineStyles,
  key,
  attributes,
  onAuthorPress
) => {
  const url = `/profile/${attributes.slug}`;
  return (
    <TextLink
      style={bylineStyles}
      key={key}
      url={url}
      onPress={e => onAuthorPress(e, { slug: attributes.slug, url })}
    >
      {children}
    </TextLink>
  );
};

const ArticleBylineWithLinks = ({ ast, style, color, onAuthorPress }) => {
  const bylineStyles = getBylineStyles(style, color);
  return renderByline(renderAuthorComponent, ast, bylineStyles, onAuthorPress);
};
ArticleBylineWithLinks.displayName = "ArticleBylineWithLinks";

ArticleBylineWithLinks.propTypes = propTypes;
ArticleBylineWithLinks.defaultProps = defaultProps;

export default ArticleBylineWithLinks;
