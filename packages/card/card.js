import React, { Component } from "react";
import { View } from "react-native";
import Image from "@times-components/image";
import { Animations } from "@times-components/styleguide";
import { cardPropTypes, cardDefaultProps } from "./card-proptypes";
import Loading from "./card-loading";
import styles from "./styles";

class CardComponent extends Component {
  shouldComponentUpdate(nextProps) {
    const { image, imageSize, isLoading, showImage } = this.props;
    return (
      (image && image.uri !== nextProps.image.uri) ||
      imageSize !== nextProps.imageSize ||
      isLoading !== nextProps.isLoading ||
      showImage !== nextProps.showImage
    );
  }

  render() {
    const {
      children,
      contentContainerClass,
      imageContainerClass,
      image,
      imageRatio,
      imageSize,
      isLoading,
      showImage
    } = this.props;

    if (isLoading) {
      return (
        <Loading
          contentContainerClass={contentContainerClass}
          imageContainerClass={imageContainerClass}
          imageRatio={imageRatio}
          showImage={showImage}
        />
      );
    }

    return (
      <Animations.FadeIn>
        <View style={styles.cardContainer}>
          {showImage &&
            image &&
            image.uri && (
              <View
                style={styles.imageContainer}
                className={imageContainerClass}
              >
                <Image
                  aspectRatio={imageRatio}
                  uri={`${image.uri}&resize=${imageSize}`}
                />
              </View>
            )}
          <View
            style={styles.contentContainer}
            className={contentContainerClass}
          >
            {children}
          </View>
        </View>
      </Animations.FadeIn>
    );
  }
}

CardComponent.propTypes = cardPropTypes;
CardComponent.defaultProps = cardDefaultProps;

export default CardComponent;
