/* eslint-disable react/no-array-index-key */
import React from "react";
import { StyleSheet, Text } from "react-native";
import { TextLink } from "@times-components/link";
import { renderTrees } from "@times-components/markup";
import { colours } from "@times-components/styleguide";

import {
  articleBylinePropTypes,
  articleBylineDefaultPropTypes
} from "./article-byline-proptypes";

const linkStyles = StyleSheet.create({
  link: {
    color: colours.functional.action
  }
});

const ArticleByline = ({ ast, section, style, onAuthorPress }) => {
  const sectionStyle = {
    color: colours.section[section] || colours.default,
  };

  return renderTrees(ast, {
    author(key, attributes, children) {
      const url = `/profile/${attributes.slug}`;
      return (
        <TextLink
          style={[linkStyles.link, sectionStyle, style.link]}
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
        <Text
          style={[linkStyles.link, sectionStyle, style.link]}
          key={key}
        >
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
