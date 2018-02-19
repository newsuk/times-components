import React from "react";
import PropTypes from "prop-types";
import { Animated, View, StyleSheet, ViewPropTypes } from "react-native";
import Image from "@times-components/image";
import Loading from "./card-loading";

const { style: ViewPropTypesStyle } = ViewPropTypes;

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 10
  }
});

class CardComponent extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0)
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim, {
        toValue: 1,
        duration: 300
      }
    ).start();
  }

  render() {
    const {
      isLoading,
      image,
      imageRatio,
      imageSize,
      showImage,
      style,
      children
    } = this.props;

    if (isLoading) {
      return (
        <View>
          <Loading aspectRatio={imageRatio} showImage={showImage} />
        </View>
      );
    }

    const imageComponent =
      image && image.uri ? (
        <View style={styles.imageContainer}>
          <Image
            uri={`${image.uri}&resize=${imageSize}`}
            aspectRatio={imageRatio}
          />
        </View>
      ) : null;

    return (
      <Animated.View onLayout={this.handleLayout} style={{opacity: this.state.fadeAnim}}>
        <View style={style}>
          {showImage ? imageComponent : null}
          <View>{children}</View>
        </View>
      </Animated.View>
    );
  }
}

CardComponent.propTypes = {
  image: PropTypes.shape({ uri: PropTypes.string }),
  imageRatio: PropTypes.number,
  imageSize: PropTypes.number,
  showImage: PropTypes.bool,
  style: ViewPropTypesStyle,
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
  style: null,
  children: [],
  isLoading: false
};

export default CardComponent;
