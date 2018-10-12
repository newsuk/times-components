import React, { Component } from "react";
import { View } from "react-native";
import Image from "@times-components/image";
import { cardPropTypes, cardDefaultProps } from "./card-prop-types";
import Loading from "./card-loading";
import styles from "./styles";

class CardContent extends Component {
  shouldComponentUpdate(nextProps) {
    const { imageUri, lowResSize, highResSize, isLoading } = this.props;
    return (
      imageUri !== nextProps.imageUri ||
      lowResSize !== nextProps.lowResSize ||
      highResSize !== nextProps.highResSize ||
      isLoading !== nextProps.isLoading
    );
  }

  render() {
    const {
      children,
      contentContainerClass,
      fadeImageIn,
      highResSize,
      imageContainerClass,
      imageRatio,
      imageStyle,
      imageUri,
      isLoading,
      isReversed,
      lowResSize,
      showImage
    } = this.props;

    const renderImage = () => {
      if (!showImage) return null;

      return (
        <View
          className={imageContainerClass}
          style={[
            styles.imageContainer,
            imageStyle,
            isReversed ? styles.reversedImageContainer : ""
          ]}
        >
          <Image
            aspectRatio={imageRatio}
            fadeImageIn={fadeImageIn}
            highResSize={highResSize}
            lowResSize={lowResSize}
            uri={imageUri}
          />
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
