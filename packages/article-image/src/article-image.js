import React from "react";
import { View } from "react-native";
import { ResponsiveContext } from "@times-components/responsive";
import ArticleImage from "./article-image.base";
import { propTypes, defaultPropTypes } from "./article-image-prop-types";
import styles from "./styles";

const ArticleImageNative = props => {
  const {
    imageOptions: { display, uri }
  } = props;

  return (
    <ResponsiveContext.Consumer>
      {({ isTablet }) => (
        <View style={isTablet && styles.imageContainerTablet}>
          <View key={uri} style={styles[`${display}Container`]}>
            <ArticleImage {...props} />
          </View>
        </View>
      )}
    </ResponsiveContext.Consumer>
  );
};

ArticleImageNative.propTypes = propTypes;
ArticleImageNative.defaultProps = defaultPropTypes;

export default ArticleImageNative;
