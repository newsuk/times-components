import React from "react";
import { View } from "react-native";
import Image from "@times-components/image";
import { Animations } from "@times-components/styleguide";
import { propTypes, defaultProps } from "./proptypes";
import Loading from "./loading";
import styles from "./styles/shared";

class CardComponent extends React.Component {
  render() {
    const {
      isLoading,
      image,
      imageRatio,
      imageSize,
      showImage,
      children
    } = this.props;

    if (isLoading) {
      return (
        <View>
          <Loading aspectRatio={imageRatio} showImage={showImage} />
        </View>
      );
    }

    const imageComponent =
      image && image.uri ? (
        <View style={styles.imageContainer}>
          <Image
            uri={`${image.uri}&resize=${imageSize}`}
            aspectRatio={imageRatio}
          />
        </View>
      ) : null;

    return (
      <Animations.FadeIn>
        <View onLayout={this.handleLayout}>
          <View>
            {showImage ? imageComponent : null}
            <View>{children}</View>
          </View>
        </View>
      </Animations.FadeIn>
    );
  }
}

CardComponent.propTypes = propTypes;
CardComponent.defaultProps = defaultProps;

export default CardComponent;
