import React from "react";
import { View, StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import ArticleImage from "./article-image.base";

import {
  articleImagePropTypes,
  articleImageDefaultPropTypes
} from "./article-image-prop-types";

const styles = StyleSheet.create({
  primaryContainer: {
    width: "100%",
    flexDirection: "column",
    paddingBottom: spacing(5)
  },
  secondaryContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingBottom: spacing(5),
    paddingLeft: spacing(2),
    paddingRight: spacing(2)
  },
  inlineContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingBottom: spacing(5),
    paddingLeft: spacing(2),
    paddingRight: spacing(2)
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
