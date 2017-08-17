import React from "react";
import { StyleSheet, View, Text } from "react-native";
import ReactStyleProp from "react-style-proptype";
import PropTypes from "prop-types";

import TimesWatermark from "./times-watermark";

const getStyles = (width, height) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    wrapper: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F9F9F9",
      width,
      height
    },
    placeholderText: {
      fontSize: 12,
      fontFamily: "TimesDigital-Regular",
      backgroundColor: "#F9F9F9",
      color: "#696969",
      borderColor: "#D8D8D8",
      borderWidth: 1,
      borderStyle: "solid",
      position: "absolute",
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 10,
      paddingRight: 10,
      letterSpacing: 1.5
    }
  });

const Placeholder = ({ width, height, style }) => {
  const styles = getStyles(width, height);
  return (
    <View style={[styles.container, style]}>
      <View style={styles.wrapper}>
        <TimesWatermark width={width} height={height} />
        <Text style={styles.placeholderText}>ADVERTISEMENT</Text>
      </View>
    </View>
  );
};

Placeholder.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  style: ReactStyleProp
};

Placeholder.defaultProps = {
  style: {}
};

export default Placeholder;
