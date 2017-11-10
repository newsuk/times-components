import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { Placeholder } from "@times-components/image";
import Gradient from "@times-components/gradient";
import styles from "./card-styles";

const loadingStyles = StyleSheet.create({
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
  },
  placeholder: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  },
  spacer3x2: {
    paddingBottom: "66.66%"
  }
});

const Loading = ({ horizontal, style }) => {
  const layoutStyles = horizontal ? styles.horizontal : styles.vertical;

  const imageComponent = (
    <View style={[layoutStyles.childrenContainer, layoutStyles.imageContainer]}>
      <View style={loadingStyles.spacer3x2} />
      <Placeholder style={loadingStyles.placeholder} />
    </View>
  );

  return (
    <View style={[layoutStyles.container, style]}>
      {imageComponent}
      <View
        style={[layoutStyles.childrenContainer, layoutStyles.summaryContainer]}
      >
        <Gradient style={[loadingStyles.headerContainer]} degrees={264} />
        <Gradient style={[loadingStyles.textContainer]} degrees={267} />
        <Gradient style={[loadingStyles.textContainer]} degrees={267} />
        <Gradient
          style={[loadingStyles.textContainer, loadingStyles.noMarginBottom]}
          degrees={267}
        />
      </View>
    </View>
  );
};

Loading.defaultProps = {
  style: null
};

Loading.propTypes = {
  horizontal: PropTypes.bool.isRequired,
  style: View.propTypes.style
};

export default Loading;
