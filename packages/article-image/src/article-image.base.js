import React from "react";
import { View, StyleSheet } from "react-native";
import { ModalImage } from "@times-components/image";
import Caption from "@times-components/caption";
import { spacing } from "@times-components/styleguide";
import InsetCaption from "./inset-caption";
import InlineImage from "./inline-image";

import {
  articleImagePropTypes,
  articleImageDefaultPropTypes
} from "./article-image-prop-types";

const styles = StyleSheet.create({
  secondaryImage: {
    width: "50%"
  },
  secondaryCaption: {
    paddingLeft: spacing(2),
    paddingTop: 0,
    width: "50%"
  }
});

const captionStyle = {
  secondary: {
    container: {
      paddingTop: 0
    }
  }
};

const renderCaption = (display, caption, credits) => {
  if (!caption && !credits) {
    return null;
  }
  const CaptionComponent =
    display === "primary" ? (
      <InsetCaption caption={caption} credits={credits} />
    ) : (
      <Caption text={caption} credits={credits} style={captionStyle[display]} />
    );

  return (
    <View key="caption" style={styles[`${display}Caption`]}>
      {CaptionComponent}
    </View>
  );
};

const ArticleImage = ({ imageOptions, captionOptions }) => {
  const { display, ratio, url } = imageOptions;
  const { caption, credits } = captionOptions;

  if (display === "inline") {
    return (
      <InlineImage
        imageOptions={imageOptions}
        captionOptions={captionOptions}
      />
    );
  }

  const children = [renderCaption(display, caption, credits)];

  if (!display || !ratio) {
    return children;
  }

  const [ratioWidth, ratioHeight] = ratio.split(":");
  const aspectRatio = ratioWidth / ratioHeight;

  return [
    <View key="img" style={styles[`${display}Image`]}>
      <ModalImage uri={url} aspectRatio={aspectRatio} />
    </View>,
    ...children
  ];
};

ArticleImage.propTypes = articleImagePropTypes;
ArticleImage.defaultProps = articleImageDefaultPropTypes;

export default ArticleImage;
