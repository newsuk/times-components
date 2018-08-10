import React from "react";
import { View } from "react-native";
import Caption from "@times-components/caption";
import { ModalImage } from "@times-components/image";
import styles from "../styles";
import InsetCaption from "./inset-caption";
import InlineImage from "./inline-image";
import { propTypes, defaultPropTypes } from "./article-image-prop-types";

const renderCaption = (display, caption, credits) => {
  if (!caption && !credits) {
    return null;
  }

  const captionStyle = {
    secondary: {
      container: {
        paddingTop: 0
      }
    }
  };

  const CaptionComponent =
    display === "primary" ? (
      <InsetCaption caption={caption} credits={credits} />
    ) : (
      <Caption credits={credits} style={captionStyle[display]} text={caption} />
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
        captionOptions={captionOptions}
        imageOptions={imageOptions}
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
      <ModalImage
        aspectRatio={aspectRatio}
        caption={caption}
        credits={credits}
        uri={url}
      />
    </View>,
    ...children
  ];
};

ArticleImage.propTypes = propTypes;
ArticleImage.defaultProps = defaultPropTypes;

export default ArticleImage;
