import React from "react";
import { Image } from "react-native";

function T() {
  return (
    <Image
      fadeDuration={0}
      resizeMode="contain"
      // eslint-disable-next-line global-require
      source={require("../../assets/t.png")}
      style={{ width: "25%" }}
    />
  );
}

export default T;
