import React from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import PropTypes from "prop-types";

import TimesWatermark from "./times-watermark";

const fontFamilyWebAndIos = "TimesDigitalW04";
const fontFamilyAndroid = "TimesDigitalW04-Regular";

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
      fontFamily:
        Platform.OS === "android" ? fontFamilyAndroid : fontFamilyWebAndIos,
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
  style: View.propTypes.style
};

Placeholder.defaultProps = {
  style: null
};

export default Placeholder;
