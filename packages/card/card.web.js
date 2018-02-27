import React, { Component } from "react";
import { View } from "react-native";
import Image from "@times-components/image";
import { Animations } from "@times-components/styleguide";
import { propTypes, defaultProps } from "./proptypes";
import Loading from "./loading";
import {
  ImageContainer,
  SummaryContainer,
  CardContainer
} from "./card-styles.web";

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
          <Loading imageRatio={imageRatio} showImage={showImage} />
        </View>
      );
    }

    return (
      <Animations.FadeIn>
        <CardContainer>
          {
            showImage && image && image.uri &&
              <ImageContainer>
                <Image
                  uri={`${image.uri}&resize=${imageSize || 100}`}
                  aspectRatio={imageRatio}
                />
              </ImageContainer>
          }
          <SummaryContainer>{children}</SummaryContainer>
        </CardContainer>
      </Animations.FadeIn>
    );
  }
}

CardComponent.propTypes = propTypes;
CardComponent.defaultProps = defaultProps;

export default CardComponent;
