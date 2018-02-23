import React, { Component } from "react";
import { View } from "react-native";
import Image from "@times-components/image";
import { Animations } from "@times-components/styleguide";
import Loading from "./loading";
import { propTypes, defaultProps } from "./proptypes";
import { CardContainer, getImageContainer } from "./styles/responsive";

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
      image,
      imageRatio,
      imageSize,
      imageMinWidth,
      isLoading,
      showImage
    } = this.props;

    console.log('showImage: ', showImage);

    if (isLoading) {
      return (
        <View>
          <Loading
            aspectRatio={imageRatio}
            imageMinWidth={imageMinWidth}
            showImage={showImage}
          />
        </View>
      );
    }

    const ImageContainer = getImageContainer(imageMinWidth);

    const imageComponent =
      image && showImage && image.uri ? (
        <ImageContainer>
          <Image
            aspectRatio={imageRatio}
            uri={`${image.uri}&resize=${imageSize}`}
          />
        </ImageContainer>
      ) : null;

    return (
      <Animations.FadeIn>
        <CardContainer>
          {imageComponent}
          {children}
        </CardContainer>
      </Animations.FadeIn>
    );
  }
}

CardComponent.propTypes = propTypes;
CardComponent.defaultProps = defaultProps;

export default CardComponent;
