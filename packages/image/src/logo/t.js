import React from "react";
import { Image } from "react-native";

// eslint-disable-next-line global-require
const logoPath = require("../../assets/t.png");

function T() {
  return (
    <Image
      fadeDuration={0}
      resizeMode="contain"
      source={logoPath}
      style={{ width: "25%" }}
    />
  );
}

export default T;
