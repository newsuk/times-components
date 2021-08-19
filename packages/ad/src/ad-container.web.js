import React from "react";
import PropTypes from "prop-types";
import { View, ViewPropTypes } from "react-native";

import styles from "./styles";

const AdContainer = ({ slotName, style }) => {
  const adMap = {
    header: "ad-header",
    "inline-ad": "ad-article-inline",
    articleListAd: "inline-ad",
    pixel: "ad-pixel",
    pixelteads: "ad-pixelteads",
    pixelskin: "ad-pixelskin",
    inlineAd1: "ad-article-inline-1",
    inlineAd2: "ad-article-inline-2",
    inlineAd3: "ad-article-inline-3"
  };

  return (
    <View id={slotName} style={[styles.container, style]}>
      <div id={`${adMap[slotName]}`} />
    </View>
  );
};

const propTypes = {
  slotName: PropTypes.string.isRequired,
  style: ViewPropTypes.style.isRequired
};

AdContainer.propTypes = propTypes;

export default AdContainer;
