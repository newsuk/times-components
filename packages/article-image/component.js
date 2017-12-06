import React from "react";
import { View, StyleSheet } from "react-native";
import Image from "@times-components/image";
import Caption from "./captionComponent";
import CaptionPrimary from "./caption-primary";

import {
  articleImagePropTypes,
  articleImageDefaultPropTypes
} from "./article-image-proptypes";

const styles = StyleSheet.create({
  secondaryImage: {
    width: "50%"
  },
  secondaryCaption: {
    paddingLeft: 10,
    paddingTop: 0,
    width: "50%"
  },
  inlineImage: {
    width: "50%"
  },
  inlineCaption: {
    width: "50%",
    paddingLeft: 10,
    paddingTop: 0
  }
});

const getCaption = (display, caption, credits) => {
  if (display === "primary") {
    return (
      <CaptionPrimary caption={caption} credits={credits} display={display} />
    );
  }

  return <Caption caption={caption} credits={credits} display={display} />;
};

const renderCaption = (display, caption, credits) => {
  if (!caption && !credits) {
    return null;
  }
  const CaptionComponent = getCaption(display, caption, credits);

  return <View style={styles[`${display}Caption`]}>{CaptionComponent}</View>;
};

const ArticleImage = ({ imageOptions, captionOptions }) => {
  const { display, ratio, url } = imageOptions;
  const { caption, credits } = captionOptions;

  const [ratioWidth, ratioHeight] = ratio.split(":");
  const aspectRatio = ratioWidth / ratioHeight;

  return [
    <View key={url} style={styles[`${display}Image`]}>
      <Image uri={url} aspectRatio={aspectRatio} />
    </View>,
    renderCaption(display, caption, credits, url)
  ];
};

ArticleImage.propTypes = articleImagePropTypes;
ArticleImage.defaultProps = articleImageDefaultPropTypes;

export default ArticleImage;
