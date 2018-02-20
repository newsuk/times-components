/* eslint-disable react/no-array-index-key */
import React from "react";
import { TextLink } from "@times-components/link";
import { renderTrees } from "@times-components/markup";
import sectionColours from "@times-components/styleguide";

import {
  articleBylinePropTypes,
  articleBylineDefaultPropTypes
} from "./article-byline-proptypes";

const ArticleByline = ({ ast, section, style }) =>
  renderTrees(ast, {
    author(key, attributes, children) {
      const url = `/profile/${attributes.slug}`;
      return (
        <TextLink
          style={[{ color: sectionColours[section] }, style]}
          key={key}
          url={url}
          onPress={() => {}}
        >
          {children}
        </TextLink>
      );
    }
  });

ArticleByline.propTypes = articleBylinePropTypes;
ArticleByline.defaultProps = articleBylineDefaultPropTypes;

export { articleBylinePropTypes };
export default ArticleByline;
