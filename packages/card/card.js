import React from "react";
import { View } from "react-native";
import Image from "@times-components/image";
import { Animations } from "@times-components/styleguide";
import { cardPropTypes, cardDefaultProps } from "./card-proptypes";
import Loading from "./card-loading";
import styles from "./styles/shared";

const CardComponent = ({
  children,
  image,
  imageRatio,
  imageSize,
  isLoading,
  showImage
}) => {
  if (isLoading) {
    return (
      <View>
        <Loading aspectRatio={imageRatio} showImage={showImage} />
      </View>
    );
  }

  return (
    <Animations.FadeIn>
      <View>
        {showImage &&
          image &&
          image.uri && (
            <View style={styles.imageContainer}>
              <Image
                aspectRatio={imageRatio}
                uri={`${image.uri}&resize=${imageSize}`}
              />
            </View>
          )}
        <View>{children}</View>
      </View>
    </Animations.FadeIn>
  );
};

CardComponent.propTypes = cardPropTypes;
CardComponent.defaultProps = cardDefaultProps;

export default CardComponent;
