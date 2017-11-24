import React from "react";
import { View, StyleSheet } from "react-native";
import ArticleImage from "./component";

import {
  articleImagePropTypes,
  articleImageDefaultPropTypes
} from "./article-image-proptypes";

const styles = StyleSheet.create({
  primaryContainer: {
    width: "100%",
    flexDirection: "column",
    paddingBottom: 25
  },
  secondaryContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingBottom: 25,
    paddingLeft: 10,
    paddingRight: 10
  },
  inlineContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingBottom: 25,
    paddingLeft: 10,
    paddingRight: 10
  },
});

const ArticleImageNative = (props) => {

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
