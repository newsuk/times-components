import React, { Component } from "react";
import { View } from "react-native";
import { ResponsiveContext } from "@times-components/responsive";
import Image from "@times-components/image";
import { cardPropTypes, cardDefaultProps } from "./card-prop-types";
import Loading from "./card-loading";
import styles from "./styles";

class CardContent extends Component {
  shouldComponentUpdate(nextProps) {
    const {
      imageUri,
      lowResQuality,
      lowResSize,
      highResSize,
      isLoading
    } = this.props;
    return (
      imageUri !== nextProps.imageUri ||
      lowResQuality !== nextProps.lowResQuality ||
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
      imageAccessibilityLabel,
      imageContainerClass,
      imageRatio,
      imageStyle,
      imageUri,
      isLoading,
      isReversed,
      lowResQuality,
      lowResSize,
      showImage
    } = this.props;

    const renderImage = isTablet => {
      if (!showImage) return null;

      return (
        <View
          className={imageContainerClass}
          style={[
            isTablet ? styles.imageContainerTablet : styles.imageContainer,
            imageStyle,
            isReversed ? styles.reversedImageContainer : ""
          ]}
        >
          <Image
            accessibilityLabel={imageAccessibilityLabel}
            aspectRatio={imageRatio}
            fadeImageIn={fadeImageIn}
            highResSize={highResSize}
            lowResQuality={lowResQuality}
            lowResSize={lowResSize}
            uri={imageUri}
          />
        </View>
      );
    };

    return (
      <ResponsiveContext.Consumer>
        {({ isTablet }) => (
          <View
            style={[
              isTablet ? styles.cardContainerTablet : styles.cardContainer,
              isReversed ? styles.reversedCardContainer : ""
            ]}
          >
            {!isReversed ? renderImage(isTablet) : null}
            <View
              className={contentContainerClass}
              style={[
                isTablet
                  ? styles.contentContainerTablet
                  : styles.contentContainer,
                isReversed ? styles.reversedContentContainer : "",
                isLoading ? styles.loadingContentContainer : ""
              ]}
            >
              {isLoading ? <Loading /> : children}
            </View>
            {isReversed ? renderImage(isTablet) : null}
          </View>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}

CardContent.propTypes = cardPropTypes;
CardContent.defaultProps = cardDefaultProps;

export default CardContent;
