import React from "react";
import { View, StyleSheet } from "react-native";
import { ModalImage } from "@times-components/image";
import Caption from "@times-components/caption";
import { spacing } from "@times-components/styleguide";

import {
  articleImagePropTypes,
  articleImageDefaultPropTypes
} from "./article-image-proptypes";

const styles = StyleSheet.create({
  inlineImage: {
    width: "50%"
  },
  inlineCaption: {
    paddingLeft: spacing(2),
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
    <View key="caption" style={styles.inlineCaption}>
      <Caption text={caption} credits={credits} style={styles} />
    </View>
  );
};

const InlineImage = ({ imageOptions, captionOptions }) => {
  const { display, ratio, url } = imageOptions;
  const { caption, credits } = captionOptions;

  const imgCaption = [renderCaption(display, caption, credits)];

  if (!display || !ratio) {
    return imgCaption;
  }

  const [ratioWidth, ratioHeight] = ratio.split(":");
  const aspectRatio = ratioWidth / ratioHeight;

  return [
    <View key="img" style={styles.inlineImage}>
      <ModalImage uri={url} aspectRatio={aspectRatio} />
    </View>,
    ...imgCaption
  ];
};

InlineImage.propTypes = articleImagePropTypes;
InlineImage.defaultProps = articleImageDefaultPropTypes;

export default InlineImage;
