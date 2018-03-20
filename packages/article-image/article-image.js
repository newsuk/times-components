import React from "react";
import { View, StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import ArticleImage from "./article-image.base";

import {
  articleImagePropTypes,
  articleImageDefaultPropTypes
} from "./article-image-proptypes";

const styles = StyleSheet.create({
  primaryContainer: {
    width: "100%",
    flexDirection: "column",
    paddingBottom: 5 * spacing
  },
  secondaryContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingBottom: 5 * spacing,
    paddingLeft: 2 * spacing,
    paddingRight: 2 * spacing
  },
  inlineContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingBottom: 5 * spacing,
    paddingLeft: 2 * spacing,
    paddingRight: 2 * spacing
  }
});

const ArticleImageNative = props => {
  const { display, url } = props.imageOptions;

  return (
    <View key={url} style={styles[`${display}Container`]}>
      <ArticleImage {...props} />
    </View>
  );
};

ArticleImageNative.propTypes = articleImagePropTypes;
ArticleImageNative.defaultProps = articleImageDefaultPropTypes;

export default ArticleImageNative;
