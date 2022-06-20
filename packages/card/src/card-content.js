/* eslint-disable no-undef */
import React, { Component } from "react";
import { TcView, checkStylesForUnits } from "@times-components/utils";
import styled from "styled-components";
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
      relatedArticle,
      showImage
    } = this.props;

    const TcCardContainer = styled(TcView)`
      ${props => props.styles && props.styles};
    `;

    const renderImage = () => {
      if (!showImage) return null;

      const imageContainerStyle = relatedArticle
        ? styles.imageContainer
        : styles.imageContainerTablet;

      return (
        <TcView
          className={imageContainerClass}
          style={checkStylesForUnits({
            ...imageContainerStyle,
            ...imageStyle,
            ...(isReversed ? styles.reversedImageContainer : "")
          })}
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
        </TcView>
      );
    };

    const cardContainerStyle = relatedArticle
      ? { ...styles.cardContainer, display: "block" }
      : styles.cardContainer;

    return (
      <TcView
        style={checkStylesForUnits({
          ...cardContainerStyle,
          ...(isReversed ? styles.reversedCardContainer : "")
        })}
      >
        {!isReversed ? renderImage() : null}
        <TcCardContainer
          className={contentContainerClass}
          styles={checkStylesForUnits({
            ...styles.contentContainer,
            ...(isReversed ? styles.reversedContentContainer : ""),
            ...(isLoading ? styles.loadingContentContainer : "")
          })}
        >
          {isLoading ? <Loading /> : children}
        </TcCardContainer>
        {isReversed ? renderImage() : null}
      </TcView>
    );
  }
}

CardContent.propTypes = cardPropTypes;
CardContent.defaultProps = cardDefaultProps;

export default CardContent;
