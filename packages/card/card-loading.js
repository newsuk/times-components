import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import Image from "@times-components/image";
import Gradient from "@times-components/gradient";
import styles from "./card-styles";

const gradientStyles = StyleSheet.create({
  headerContainer: {
    height: 24,
    marginBottom: 10,
    maxWidth: 400
  },
  textContainer: {
    height: 10,
    marginBottom: 10
  },
  noMarginBottom: {
    marginBottom: 0
  }
});

const Loading = ({ horizontal, aspectRatio, style }) => {
  const layoutStyles = horizontal ? styles.horizontal : styles.vertical;

  const imageComponent = (
    <View style={[layoutStyles.childrenContainer, layoutStyles.imageContainer]}>
      <Image style={layoutStyles.image} aspectRatio={aspectRatio} />
    </View>
  );

  return (
    <View style={[layoutStyles.container, style]}>
      {imageComponent}
      <View
        style={[layoutStyles.childrenContainer, layoutStyles.summaryContainer]}
      >
        <Gradient style={[gradientStyles.headerContainer]} degrees={264} />
        <Gradient style={[gradientStyles.textContainer]} degrees={267} />
        <Gradient style={[gradientStyles.textContainer]} degrees={267} />
        <Gradient
          style={[gradientStyles.textContainer, gradientStyles.noMarginBottom]}
          degrees={267}
        />
      </View>
    </View>
  );
};

Loading.defaultProps = {
  horizontal: false,
  aspectRatio: 1,
  style: null
};

Loading.propTypes = {
  horizontal: PropTypes.bool,
  aspectRatio: PropTypes.number,
  style: View.propTypes.style
};

export default Loading;
