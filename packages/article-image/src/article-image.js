import React from "react";
import { View } from "react-native";
import ArticleImage from "./article-image.base";
import { propTypes, defaultPropTypes } from "./article-image-prop-types";
import styles from "./styles";

const ArticleImageNative = props => {
  const { display, uri } = props.imageOptions;

  return (
    <View key={uri} style={styles[`${display}Container`]}>
      <ArticleImage {...props} />
    </View>
  );
};

ArticleImageNative.propTypes = propTypes;
ArticleImageNative.defaultProps = defaultPropTypes;

export default ArticleImageNative;
