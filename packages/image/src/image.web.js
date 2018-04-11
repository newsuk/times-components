import React from "react";
import { View } from "react-native";
import Placeholder from "./placeholder";
import { defaultProps, propTypes } from "./image-proptypes";
import styles from "./styles";

const TimesImage = ({ uri, aspectRatio, style }) =>
  <View style={[styles.wrapper, style]}>
    <img alt="" src={uri} style={{ display: "block", position: "absolute", width: "100%", zIndex: 1 }} />
    <Placeholder style={[styles.placeholder, { paddingBottom: `${100 / aspectRatio}%` }]} />
  </View>

TimesImage.propTypes = propTypes;
TimesImage.defaultProps = defaultProps;

export default TimesImage;
