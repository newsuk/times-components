import React from "react";
import { Image } from "react-native";
import styles from "./styles";

const MastHead = () => (
  <Image
    resizeMode="contain"
    // eslint-disable-next-line global-require
    source={require("../../../assets/times-leading-header.png")}
    style={styles.mastheadStyle}
  />
);

export default MastHead;
