/* eslint-disable react/no-array-index-key */
import React from "react";
import { StyleSheet } from "react-native";
import { TextLink } from "@times-components/link";
import { renderTrees } from "@times-components/markup";
import { colours } from "@times-components/styleguide";

import {
  articleBylinePropTypes,
  articleBylineDefaultPropTypes
} from "./article-byline-proptypes";

const linkStyles = StyleSheet.create({
  link: {
    color: colours.functional.azureBlue
  }
});

const ArticleByline = ({ ast, style }) =>
  renderTrees(ast, {
    author(key, attributes, children) {
      const url = `/profile/${attributes.slug}`;
      return (
        <TextLink
          style={[linkStyles.link, style.link]}
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
