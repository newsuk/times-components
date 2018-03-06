import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import { Animations } from "@times-components/styleguide";
import { cardPropTypes, cardDefaultProps } from "./card-proptypes";
import Loading from "./card-loading";
import styles from "./styles/shared";

class CardComponent extends Component {
  shouldComponentUpdate(nextProps) {
    const { image, imageSize, isLoading, showImage } = this.props;
    return (
      (image && image.uri !== nextProps.image.uri) ||
      imageSize !== nextProps.imageSize ||
      isLoading !== nextProps.isLoading ||
      showImage !== nextProps.showImage
    );
  }
  render() {
    const {
      children,
      contentClass,
      imgClass,
      image,
      imageRatio,
      imageSize,
      isLoading,
      showImage
    } = this.props;

    if (isLoading) {
      return (
        <Loading
          aspectRatio={imageRatio}
          contentClass={contentClass}
          imgClass={imgClass}
          showImage={showImage}
        />
      );
    }

    return (
      <Animations.FadeIn>
        <View style={styles.cardContainer}>
          {showImage &&
            image &&
            image.uri && (
              <View style={styles.imgContainer} className={imgClass}>
                <Image
                  aspectRatio={imageRatio}
                  uri={`${image.uri}&resize=${imageSize}`}
                />
              </View>
            )}
          <View style={styles.contentContainer} className={contentClass}>
            {children}
          </View>
        </View>
      </Animations.FadeIn>
    );
  }
}

CardComponent.propTypes = {
  ...cardPropTypes,
  contentClass: PropTypes.string,
  imgClass: PropTypes.string
};
CardComponent.defaultProps = {
  ...cardDefaultProps,
  contentClass: "",
  imgClass: ""
};

export default CardComponent;
