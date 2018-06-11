import React from "react";
import { StyleSheet, View, Text, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";
import TimesWatermark from "./ad-watermark";

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
      backgroundColor: colours.functional.backgroundPrimary,
      width,
      height,
      borderColor: colours.functional.keyline,
      borderWidth: 1,
      borderStyle: "solid"
    },
    placeholderText: {
      fontSize: fontSizes.puffLink,
      fontFamily: fonts.body,
      backgroundColor: colours.functional.backgroundPrimary,
      color: colours.functional.secondary,
      borderColor: colours.functional.keyline,
      borderWidth: 1,
      borderStyle: "solid",
      position: "absolute",
      paddingTop: spacing(1),
      paddingBottom: spacing(1),
      paddingLeft: spacing(2),
      paddingRight: spacing(2),
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
  style: ViewPropTypes.style
};

Placeholder.defaultProps = {
  style: null
};

export default Placeholder;
