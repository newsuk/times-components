import React, { Component } from "react";
import { View } from "react-native";
import Image from "@times-components/image";
import { Animations } from "@times-components/styleguide";
import Loading from "./loading";
import { propTypes, defaultProps } from "./proptypes";
import {
  CardContainer,
  getChildContainer,
  getImageContainer
} from "./styles/responsive";

class CardComponent extends Component {
  shouldComponentUpdate(nextProps) {
    const { image, imageSize, showImage, isLoading } = this.props;

    return (
      (image && image.uri !== nextProps.image.uri) ||
      imageSize !== nextProps.imageSize ||
      showImage !== nextProps.showImage ||
      isLoading !== nextProps.isLoading
    );
  }
  render() {
    const { children, childRatio, image, imageRatio, imageSize, showImage, isLoading } = this.props;

    if (isLoading) {
      return (
        <View>
          <Loading
            aspectRatio={imageRatio}
            childRatio={childRatio}
            showImage={showImage}
          />
        </View>
      );
    }

    const ChildContainer = getChildContainer(childRatio);
    const ImageContainer = getImageContainer();

    // for tests
    ChildContainer.displayName = "ChildContainer";
    ImageContainer.displayName = "ImageContainer";

    return (
      <Animations.FadeIn>
        <CardContainer>
          {showImage &&
            image && image.uri && (
              <ImageContainer>
                <Image aspectRatio={imageRatio} uri={`${image.uri}&resize=${imageSize}`} />
              </ImageContainer>
            )}
          <ChildContainer>{children}</ChildContainer>
        </CardContainer>
      </Animations.FadeIn>
    );
  }
}

CardComponent.propTypes = propTypes;
CardComponent.defaultProps = defaultProps;

export default CardComponent;
