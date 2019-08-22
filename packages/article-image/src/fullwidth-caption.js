import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { CentredCaption } from "@times-components/caption";
import styles from "./styles";

const FullWidthCaption = ({ text, credits }) => (
  <View style={styles.fullwidthCaption}>
    <CentredCaption credits={credits} text={text} />
  </View>
);

FullWidthCaption.propTypes = {
  credits: PropTypes.string,
  text: PropTypes.string
};

FullWidthCaption.defaultProps = {
  credits: "",
  text: ""
};

export default FullWidthCaption;
