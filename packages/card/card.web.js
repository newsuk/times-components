import React, { Component } from "react";
import { View } from "react-native";
import Image from "@times-components/image";
import { Animations } from "@times-components/styleguide";
import Loading from "./loading";
import { propTypes, defaultProps } from "./proptypes";
import { CardContainer, getChildContainer, getImageContainer } from "./styles/responsive";

class CardComponent extends Component {
  shouldComponentUpdate(nextProps) {
    const { image, isLoading } = this.props;
    const { isShowing, size, uri } = image;

    return (
      (image && uri !== nextProps.image.uri) ||
      size !== nextProps.image.size ||
      isShowing !== nextProps.image.isShowing ||
      isLoading !== nextProps.isLoading
    );
  }
  render() {
    const {
      children,
      childRatio,
      image,
      isLoading
    } = this.props;
    const { isShowing, ratio, size, uri } = image;

    if (isLoading) {
      return (
        <View>
          <Loading
            aspectRatio={ratio}
            childRatio={childRatio}
            showImage={isShowing}
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
          {
            image && isShowing && uri &&
              <ImageContainer>
                <Image
                  aspectRatio={ratio}
                  uri={`${uri}&resize=${size}`}
                />
              </ImageContainer>
          }
          <ChildContainer>
            {children}
          </ChildContainer>
        </CardContainer>
      </Animations.FadeIn>
    );
  }
}

CardComponent.propTypes = propTypes;
CardComponent.defaultProps = defaultProps;

export default CardComponent;
