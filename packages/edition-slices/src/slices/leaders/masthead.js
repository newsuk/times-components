import React from "react";
import { Image } from "react-native";
import styles from "./styles";
import propTypes from "./proptypes";

const MastHead = ({ publicationName }) => {
  let style = "mastheadStyleST";
  // eslint-disable-next-line global-require
  let source = require("../../../assets/st-masthead.png");

  if (publicationName === "TIMES") {
    style = "mastheadStyleTimes";
    source = require("../../../assets/times-leading-header.png");
  }

  return <Image resizeMode="contain" source={source} style={styles[style]} />;
};

MastHead.propTypes = propTypes;

export default MastHead;
