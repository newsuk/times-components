/* eslint-disable no-undef */
import React from "react";
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

export default AdContainer;
