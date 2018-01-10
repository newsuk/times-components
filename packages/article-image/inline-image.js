import React from "react";
import { View, StyleSheet } from "react-native";
import Image from "@times-components/image";
import Caption from "@times-components/caption";

import {
  articleImagePropTypes,
  articleImageDefaultPropTypes
} from "./article-image-proptypes";

const styles = StyleSheet.create({
  inlineImage: {
    width: "50%"
  },
  inlineCaption: {
    paddingLeft: 10,
    paddingTop: 0,
    width: "50%"
  }
});

const captionStyle = {
  inline: {
    container: {
      paddingTop: 0
    }
  }
};

const renderCaption = (display, caption, credits) => {
  if (!caption && !credits) {
    return null;
  }

  return (
    <View key="caption" style={styles[`${display}Caption`]}>
      <Caption text={caption} credits={credits} style={captionStyle[display]} />
    </View>
  );
};

const ArticleImage = ({ imageOptions, captionOptions }) => {
  const { display, ratio, url } = imageOptions;
  const { caption, credits } = captionOptions;

  const children = [renderCaption(display, caption, credits)];

  if (!display || !ratio) {
    return children;
  }

  const [ratioWidth, ratioHeight] = ratio.split(":");
  const aspectRatio = ratioWidth / ratioHeight;

  return [
    <View key="img" style={styles[`${display}Image`]}>
      <Image uri={url} aspectRatio={aspectRatio} />
    </View>,
    ...children
  ];
};

ArticleImage.propTypes = articleImagePropTypes;
ArticleImage.defaultProps = articleImageDefaultPropTypes;

export default ArticleImage;
