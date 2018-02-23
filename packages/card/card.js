import React from "react";
import { View, ViewPropTypes } from "react-native";
import Image from "@times-components/image";
import { Animations } from "@times-components/styleguide";
import Loading from "./loading";
import { propTypes, defaultProps } from "./proptypes";
import styles from "./styles/shared";

const { style: ViewPropTypesStyle } = ViewPropTypes;

const CardComponent = ({
  children,
  image,
  imageRatio,
  imageSize,
  isLoading,
  showImage,
  style
}) => {
  if (isLoading) {
    return (
      <View>
        <Loading aspectRatio={imageRatio} showImage={showImage} />
      </View>
    );
  }

  const imageComponent =
    image && showImage && image.uri ? (
      <View style={styles.imageContainer}>
        <Image
          aspectRatio={imageRatio}
          uri={`${image.uri}&resize=${imageSize}`}
        />
      </View>
    ) : null;

  return (
    <Animations.FadeIn>
      <View>
        <View style={style}>
          {imageComponent}
          <View>{children}</View>
        </View>
      </View>
    </Animations.FadeIn>
  );
};

CardComponent.propTypes = {
  ...propTypes,
  style: ViewPropTypesStyle
};

CardComponent.defaultProps = {
  ...defaultProps,
  style: null
};

export default CardComponent;
