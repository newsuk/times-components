import React from "react";
import PropTypes from "prop-types";
import { ViewPropTypes } from "react-native";

import styles from "./styles";

import { View } from "react-native";

const AdContainer = ({slotName, style}) => {
  
  const adMap = {
    header: "ad-header",
    "inline-ad": "ad-article-inline",
    pixel: "ad-pixel",
    pixelteads: "ad-pixelteads",
    pixelskin: "ad-pixelskin"
  }
  
  return (
    <View style={[styles.container, style]}>
      <div id={`${adMap[slotName]}`} />
    </View>
  );
}

const propTypes = {
  slotName: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
};

AdContainer.propTypes = propTypes

export default AdContainer;
