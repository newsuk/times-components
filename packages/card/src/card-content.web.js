/* eslint-disable no-undef */
import React, { Component } from "react";
import { View } from "react-native";
import Image from "@times-components/image";
import { cardPropTypes, cardDefaultProps } from "./card-prop-types";
import Loading from "./card-loading";
import styles from "./styles";

const checkBrowser = () => {
  if (!navigator) {
    return false;
  }

  const { userAgent } = navigator;
  const matchBrowser =
    userAgent.match(
      /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
    ) || [];

  if (/safari/i.test(matchBrowser[1])) {
    const indexOfVersion = navigator.appVersion.indexOf("Version/") + 8;
    const version = parseInt(
      navigator.appVersion.slice(indexOfVersion, indexOfVersion + 1),
      10
    );

    return version > 5 && version <= 9;
  }
  return false;
};

class CardContent extends Component {
  constructor() {
    super();

    this.state = {
      isOldSafari: false
    };
  }

  componentDidMount() {
    const isOldSafari = checkBrowser();
    this.setState({
      isOldSafari
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { imageUri, lowResSize, highResSize, isLoading } = this.props;
    return (
      imageUri !== nextProps.imageUri ||
      lowResSize !== nextProps.lowResSize ||
      highResSize !== nextProps.highResSize ||
      isLoading !== nextProps.isLoading ||
      nextState.isOldSafari
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
      lowResSize,
      showImage,
      relatedArticle
    } = this.props;

    const { isOldSafari } = this.state;

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
            accessibilityLabel={imageAccessibilityLabel}
            aspectRatio={imageRatio}
            fadeImageIn={fadeImageIn}
            highResSize={highResSize}
            lowResSize={lowResSize}
            uri={imageUri}
          />
        </View>
      );
    };

    const cardContainerStyle =
      relatedArticle && isOldSafari
        ? {
            ...styles.cardContainer,
            display: "block"
          }
        : styles.cardContainer;

    return (
      <View
        style={[
          cardContainerStyle,
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
