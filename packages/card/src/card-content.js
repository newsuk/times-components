import React, { Component } from "react";
import { View } from "react-native";
import Image from "@times-components/image";
import { cardPropTypes, cardDefaultProps } from "./card-prop-types";
import Loading from "./card-loading";
import styles from "./styles";

class CardContent extends Component {
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
            isReversed ? styles.reversedContentContainer : "",
            isLoading ? styles.loadingContentContainer : ""
          ]}
        >
          {isLoading ? <Loading /> : children}
        </View>
        {isReversed ? renderImage() : null}
      </View>
    );
  }
}

CardContent.propTypes = cardPropTypes;
CardContent.defaultProps = cardDefaultProps;

export default CardContent;
