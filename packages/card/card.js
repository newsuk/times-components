import React from "react";
import { View } from "react-native";
import Image from "@times-components/image";
import { Animations } from "@times-components/styleguide";
import Loading from "./loading";
import { propTypes, defaultProps } from "./proptypes";
import styles from "./styles/shared";

const CardComponent = ({ children, image, isLoading }) => {
  const { isShowing, ratio, size, uri } = image;
  if (isLoading) {
    return (
      <View>
        <Loading aspectRatio={ratio} showImage={isShowing} />
      </View>
    );
  }

  return (
    <Animations.FadeIn>
      <View>
        {isShowing &&
          uri && (
            <View style={styles.imageContainer}>
              <Image aspectRatio={ratio} uri={`${uri}&resize=${size}`} />
            </View>
          )}
        <View>{children}</View>
      </View>
    </Animations.FadeIn>
  );
};

CardComponent.propTypes = propTypes;
CardComponent.defaultProps = defaultProps;

export default CardComponent;
