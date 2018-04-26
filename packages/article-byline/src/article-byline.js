/* eslint-disable react/no-array-index-key */
import React from "react";
import { StyleSheet, Text } from "react-native";
import { TextLink } from "@times-components/link";
import { renderTrees } from "@times-components/markup";
import { colours } from "@times-components/styleguide";

import {
  articleBylinePropTypes,
  articleBylineDefaultPropTypes
} from "./article-byline-prop-types";

const linkStyles = StyleSheet.create({
  link: {
    color: colours.functional.action
  }
});

const ArticleByline = ({ ast, color, style, onAuthorPress }) => {
  const styles = [linkStyles.link, color && { color }, style.link];

  return renderTrees(ast, {
    author(key, attributes, children) {
      const url = `/profile/${attributes.slug}`;
      return (
        <TextLink
          style={styles}
          key={key}
          url={url}
          onPress={e => onAuthorPress(e, { slug: attributes.slug, url })}
        >
          {children}
        </TextLink>
      );
    },

    inline(key, attributes, children) {
      return (
        <Text style={styles} key={key}>
          {children}
        </Text>
      );
    }
  });
};

ArticleByline.propTypes = articleBylinePropTypes;
ArticleByline.defaultProps = articleBylineDefaultPropTypes;

export { articleBylinePropTypes };
export default ArticleByline;
