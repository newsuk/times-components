import React from "react";
import { View } from "react-native";
import Image from "@times-components/image";
import Gradient from "@times-components/gradient";
import { sharedPropTypes, sharedDefaultProps } from "./card-shared-prop-types";
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
        className={imageContainerClass}
        style={[
          styles.imageContainer,
          isReversed ? styles.reversedImageContainer : ""
        ]}
      >
        <Image aspectRatio={imageRatio} />
      </View>
    );
  };
  return (
    <View style={styles.cardContainer}>
      {!isReversed ? renderImage() : null}
      <View
        className={contentContainerClass}
        style={[
          styles.contentContainer,
          isReversed ? styles.reversedContentContainer : ""
        ]}
      >
        <Gradient degrees={264} style={[styles.headerContainer]} />
        <Gradient degrees={267} style={[styles.textContainer]} />
        <Gradient degrees={267} style={[styles.textContainer]} />
        <Gradient
          degrees={267}
          style={[styles.textContainer, styles.lastBar]}
        />
      </View>
      {isReversed ? renderImage() : null}
    </View>
  );
};

Loading.propTypes = sharedPropTypes;
Loading.defaultProps = sharedDefaultProps;

export default Loading;
