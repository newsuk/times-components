import React from "react";
import { View } from "react-native";
import Caption from "@times-components/caption";
import { ModalImage } from "@times-components/image";
import { propTypes, defaultPropTypes } from "./article-image-prop-types";
import styles from "./styles";

const renderCaption = (display, caption, credits) => {
  if (!caption && !credits) {
    return null;
  }

  return (
    <View key="caption" style={styles.inlineCaption}>
      <Caption credits={credits} style={styles} text={caption} />
    </View>
  );
};

const InlineImage = ({ imageOptions, captionOptions, onImagePress }) => {
  const {
    display,
    highResSize,
    lowResSize,
    index,
    ratio,
    uri,
    relativeWidth,
    relativeHeight,
    relativeHorizontalOffset,
    relativeVerticalOffset
  } = imageOptions;
  const { caption, credits } = captionOptions;

  const imgCaption = [renderCaption(display, caption, credits)];

  if (!display || !ratio) {
    return imgCaption;
  }

  const [ratioWidth, ratioHeight] = ratio.split(":");
  const aspectRatio = ratioWidth / ratioHeight;

  return [
    <View key="img" style={styles.inlineImage}>
      <ModalImage
        aspectRatio={aspectRatio}
        caption={<Caption credits={credits} text={caption} />}
        highResSize={highResSize}
        index={index}
        lowResSize={lowResSize}
        onImagePress={onImagePress}
        uri={uri}
        relativeWidth={relativeWidth}
        relativeHeight={relativeHeight}
        relativeHorizontalOffset={relativeHorizontalOffset}
        relativeVerticalOffset={relativeVerticalOffset}
      />
    </View>,
    ...imgCaption
  ];
};

InlineImage.propTypes = propTypes;
InlineImage.defaultProps = defaultPropTypes;

export default InlineImage;
