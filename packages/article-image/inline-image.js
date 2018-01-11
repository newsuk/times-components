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
  },
  container: {
    paddingTop: 0
  }
});

const renderCaption = (display, caption, credits) => {
  if (!caption && !credits) {
    return null;
  }

  return (
    <View key="caption" style={styles[`${display}Caption`]}>
      <Caption text={caption} credits={credits} style={styles} />
    </View>
  );
};

const ArticleImage = ({ imageOptions, captionOptions }) => {
  const { display, ratio, url } = imageOptions;
  const { caption, credits } = captionOptions;

  const imgCaption = [renderCaption(display, caption, credits)];

  if (!display || !ratio) {
    return imgCaption;
  }

  const [ratioWidth, ratioHeight] = ratio.split(":");
  const aspectRatio = ratioWidth / ratioHeight;

  return [
    <View key="img" style={styles[`${display}Image`]}>
      <Image uri={url} aspectRatio={aspectRatio} />
    </View>,
    ...imgCaption
  ];
};

ArticleImage.propTypes = articleImagePropTypes;
ArticleImage.defaultProps = articleImageDefaultPropTypes;

export default ArticleImage;
