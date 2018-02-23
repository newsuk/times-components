import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import { Animations } from "@times-components/styleguide";
import Loading from "./card-loading";
import {
  ImageContainer
} from "./card-styles.web";

class CardComponent extends React.Component {
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

    const imageComponent =
      image && image.uri ? (
        <ImageContainer>
          <Image
            uri={`${image.uri}&resize=${imageSize || 100}`}
            aspectRatio={imageRatio}
          />
        </ImageContainer>
      ) : null;

    return (
      <Animations.FadeIn>
        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
          {showImage ? imageComponent : null}
          <View style={{ flex: 2.7, minWidth: 420 }}>{children}</View>
        </View>
      </Animations.FadeIn>
    );
  }
}

CardComponent.propTypes = {
  image: PropTypes.shape({ uri: PropTypes.string }),
  imageRatio: PropTypes.number,
  imageSize: PropTypes.number,
  showImage: PropTypes.bool,
  children: PropTypes.node,
  isLoading: PropTypes.bool
};

CardComponent.defaultProps = {
  image: {
    uri: ""
  },
  imageRatio: 1,
  imageSize: 100,
  showImage: false,
  children: [],
  isLoading: false
};

export default CardComponent;
