import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import { Animations } from "@times-components/styleguide";
import { propTypes, defaultProps } from "./proptypes";
import Loading from "./loading";
import {
  CardContainer,
  getChildContainer,
  ImageContainer
} from "./styles/responsive";

class CardComponent extends Component {
  shouldComponentUpdate(nextProps) {
    const { childRatio, image, imageSize, isLoading, showImage } = this.props;
    return (
      (image && image.uri !== nextProps.image.uri) ||
      imageSize !== nextProps.imageSize ||
      isLoading !== nextProps.isLoading ||
      showImage !== nextProps.showImage ||
      childRatio !== nextProps.childRatio
    );
  }
  render() {
    const {
      children,
      childRatio,
      image,
      imageRatio,
      imageSize,
      isLoading,
      showImage
    } = this.props;

    if (isLoading) {
      return (
        <View>
          <Loading aspectRatio={imageRatio} childRatio={childRatio} showImage={showImage} />
        </View>
      );
    }

    const ChildContainer = getChildContainer(childRatio);

    return (
      <Animations.FadeIn>
        <CardContainer>
          {
            showImage && image && image.uri &&
              <ImageContainer>
                <Image
                  aspectRatio={imageRatio}
                  uri={`${image.uri}&resize=${imageSize}`}
                />
              </ImageContainer>
          }
          <ChildContainer>{children}</ChildContainer>
        </CardContainer>
      </Animations.FadeIn>
    );
  }
}

CardComponent.propTypes = {
  ...propTypes,
  childRatio: PropTypes.number
};
CardComponent.defaultProps = {
  ...defaultProps,
  childRatio: 1
};

export default CardComponent;
