import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import styles from "./card-styles";
import CardImage from "./card-loading-image";
import Gradient from "./card-loading-gradient";

const gradientStyles = StyleSheet.create({
  headerContainer: {
    height: 24,
    marginBottom: 10,
    maxWidth: 400
  },
  textContainer: {
    height: 10,
    marginBottom: 10
  }
});

const Loading = ({ horizontal, style }) => {
  const layoutStyles = horizontal ? styles.horizontal : styles.vertical;

  const imageComponent = (
    <View style={[layoutStyles.childrenContainer, layoutStyles.imageContainer]}>
      <CardImage style={[layoutStyles.image]} ratio={3 / 2} />
    </View>
  );

  return (
    <View style={[layoutStyles.container, style]}>
      {imageComponent}
      <View
        style={[layoutStyles.childrenContainer, layoutStyles.summaryContainer]}
      >
        <Gradient style={[gradientStyles.headerContainer]} angle={264} />
        <Gradient style={[gradientStyles.textContainer]} angle={267} />
        <Gradient style={[gradientStyles.textContainer]} angle={267} />
        <Gradient
          style={[
            gradientStyles.textContainer,
            {
              marginBottom: 0
            }
          ]}
          angle={267}
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
