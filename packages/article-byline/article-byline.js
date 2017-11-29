/* eslint-disable react/no-array-index-key */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextLink } from "@times-components/link";
import { renderTrees } from "@times-components/markup";
import styles from "./article-byline-styles";

import {
  articleBylinePropTypes,
  articleBylineDefaultPropTypes
} from "./article-byline-proptypes";

const linkStyles = StyleSheet.create({
  link: {
    color: "#069"
  }
});

const ArticleByline = ({ ast, style, WrapperComponent }) => {
  return (
    <View style={[styles.container, style.container]}>
      <WrapperComponent
        accessibilityLabel="articleByline"
        testID="articleByline"
        style={[styles.byline, style.byline, styles.bylineColor]}
      >
        {renderTrees(ast, {
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
        })}
      </WrapperComponent>
    </View>
  );
};

export default ArticleByline;

ArticleByline.propTypes = articleBylinePropTypes;

ArticleByline.defaultProps = articleBylineDefaultPropTypes;
