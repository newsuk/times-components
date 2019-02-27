import React from "react";
import { Image } from "react-native";
import styles from "./styles";

const MastHead = ({publicationName}) => (
  <Image
    resizeMode="contain"
    // eslint-disable-next-line global-require
    source={publicationName === 'TIMES' ? require("../../../assets/times-leading-header.png"): require("../../../assets/st-masthead.png")}
    style={styles.mastheadStyle}
  />
);

export default MastHead;
