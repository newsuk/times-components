import React from "react";
import { Text } from "react-native";
import { MarkupBuilder } from "@times-components/markup";
import { webStyles } from "./article-byline-styles";

import articleBylinePropTypes from "./article-byline-proptypes";

export default function ArticleBylineWeb({ ast, style }) {
  if (!ast) {
    return null;
  }

  const tagMap = new Map([
    [
      "author",
      {
        tag: "a",
        attrs({ slug }) {
          return {
            style: { ...webStyles.link, ...style.link },
            href: `/profile/${slug}`
          };
        }
      }
    ],
    [
      "div",
      {
        tag: "div",
        attrs() {}
      }
    ]
  ]);

  return (
    <Text style={[webStyles.byline, style.byline]}>
      <MarkupBuilder ast={ast} tagMap={tagMap} />
    </Text>
  );
}

ArticleBylineWeb.propTypes = articleBylinePropTypes;

ArticleBylineWeb.defaultProps = {
  ast: {},
  style: {}
};
