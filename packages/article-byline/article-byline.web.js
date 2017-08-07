import React from "react";
import { Text } from "react-native";
import { MarkupBuilder } from "@times-components/markup";

const styles = {
  byline: {
    color: "#696969",
    fontSize: 13,
    fontFamily: "GillSansMTStd-Medium"
  },
  link: {
    color: "#069"
  }
};

export default function ArticleByline({ ast, style }) {
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
            style: { ...styles.link, ...style.link },
            href: `/profile/${slug}`
          };
        }
      }
    ],
    [
      "div",
      {
        tag: Text,
        attrs() {},
        wrapText: Text
      }
    ]
  ]);

  return (
    <Text style={[styles.byline, style.byline]}>
      <MarkupBuilder ast={ast} tagMap={tagMap} />
    </Text>
  );
}

ArticleByline.propTypes = {
  ast: MarkupBuilder.propTypes.ast,
  style: Text.propTypes.style
};

ArticleByline.defaultProps = {
  ast: {},
  style: {}
};
