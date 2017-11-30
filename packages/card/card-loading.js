import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import Image from "@times-components/image";
import Gradient from "@times-components/gradient";

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 10
  }
});

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

const Loading = ({ aspectRatio }) => {
  const imageComponent = (
    <View style={styles.imageContainer}>
      <Image aspectRatio={aspectRatio} />
    </View>
  );

  return (
    <View>
      {imageComponent}
      <View>
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
  aspectRatio: 1
};

Loading.propTypes = {
  aspectRatio: PropTypes.number
};

export default Loading;
