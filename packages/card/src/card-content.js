/* eslint-disable no-undef */
import React, { Component } from "react";
import { View } from "react-native";
import { ResponsiveContext } from "@times-components/responsive";
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

    return version > 5 && version < 10;
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
      <ResponsiveContext.Consumer>
        {({ isTablet }) => (
          <View
            style={[
              isTablet ? styles.cardContainerTablet : cardContainerStyle,
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
