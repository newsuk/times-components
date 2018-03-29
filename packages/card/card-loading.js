import React from "react";
import { View } from "react-native";
import Image from "@times-components/image";
import Gradient from "@times-components/gradient";
import { sharedPropTypes, sharedDefaultProps } from "./card-shared-proptypes";
import styles from "./styles";

const Loading = ({
  contentContainerClass,
  imageContainerClass,
  imageRatio,
  isReversed,
  showImage
}) => {
  const renderImage = () => {
    if (!showImage) return null;
    return (
      <View
        style={[
          styles.imageContainer,
          isReversed ? styles.reversedImageContainer : ""
        ]}
        className={imageContainerClass}
      >
        <Image aspectRatio={imageRatio} />
      </View>
    );
  };
  return (
    <View style={styles.cardContainer}>
      {!isReversed ? renderImage() : null}
      <View
        style={[
          styles.contentContainer,
          isReversed ? styles.reversedContentContainer : ""
        ]}
        className={contentContainerClass}
      >
        <Gradient style={[styles.headerContainer]} degrees={264} />
        <Gradient style={[styles.textContainer]} degrees={267} />
        <Gradient style={[styles.textContainer]} degrees={267} />
        <Gradient
          style={[styles.textContainer, styles.lastBar]}
          degrees={267}
        />
      </View>
      {isReversed ? renderImage() : null}
    </View>
  );
};

Loading.propTypes = sharedPropTypes;
Loading.defaultProps = sharedDefaultProps;

export default Loading;
