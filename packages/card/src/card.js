import React, { Component } from "react";
import { View } from "react-native";
import Image from "@times-components/image";
import { Animations } from "@times-components/styleguide";
import { cardPropTypes, cardDefaultProps } from "./card-proptypes";
import Loading from "./card-loading";
import styles from "./styles";

class CardComponent extends Component {
  shouldComponentUpdate(nextProps) {
    const { image, imageSize, isLoading } = this.props;
    return (
      (image && image.uri !== nextProps.image.uri) ||
      imageSize !== nextProps.imageSize ||
      isLoading !== nextProps.isLoading
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
      imageStyle,
      isLoading,
      isReversed,
      showImage
    } = this.props;

    if (isLoading) {
      return (
        <Loading
          contentContainerClass={contentContainerClass}
          imageContainerClass={imageContainerClass}
          imageRatio={imageRatio}
          isReversed={isReversed}
          showImage={showImage}
        />
      );
    }

    const renderImage = () => {
      if (!showImage) return null;

      const imageUrl =
        image && image.uri
          ? `${image.uri}${imageSize ? `&resize=${imageSize}` : ``}`
          : ``;

      return (
        <View
          className={imageContainerClass}
          style={[
            styles.imageContainer,
            imageStyle,
            isReversed ? styles.reversedImageContainer : ""
          ]}
        >
          <Image aspectRatio={imageRatio} uri={imageUrl} />
        </View>
      );
    };

    return (
      <Animations.FadeIn>
        <View
          style={[
            styles.cardContainer,
            isReversed ? styles.reversedCardContainer : ""
          ]}
        >
          {!isReversed ? renderImage() : null}
          <View
            className={contentContainerClass}
            style={[
              styles.contentContainer,
              isReversed ? styles.reversedContentContainer : ""
            ]}
          >
            {children}
          </View>
          {isReversed ? renderImage() : null}
        </View>
      </Animations.FadeIn>
    );
  }
}

CardComponent.propTypes = cardPropTypes;
CardComponent.defaultProps = cardDefaultProps;

export default CardComponent;
