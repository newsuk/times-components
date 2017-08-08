import React from "react";
import { Text, Linking } from "react-native";
import { MarkupBuilder } from "@times-components/markup";
import articleBylinePropTypes from "./article-byline-proptypes";
import { nativeStyles } from "./article-byline-styles";

export default function ArticleBylineNative({ ast, style }) {
  if (!ast) {
    return null;
  }

  const tagMap = new Map([
    [
      "author",
      {
        tag: Text,
        attrs({ slug }) {
          return {
            style: { ...nativeStyles.link, ...style.link },
            onPress() {
              Linking.openURL(`profile/${slug}`);
            }
          };
        }
      }
    ],
    [
      "text",
      {
        tag: Text,
        attrs() {}
      }
    ]
  ]);

  return (
    <Text style={[nativeStyles.byline, style.byline]}>
      <MarkupBuilder ast={ast} tagMap={tagMap} wrapIn="text" />
    </Text>
  );
}

ArticleBylineNative.propTypes = articleBylinePropTypes;

ArticleBylineNative.defaultProps = {
  ast: {},
  style: {}
};
