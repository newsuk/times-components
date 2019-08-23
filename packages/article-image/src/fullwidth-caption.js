import React from "react";
import { View } from "react-native";
import { CentredCaption } from "@times-components/caption";
import { propTypes, defaultProps } from "./fullwidth-caption-prop-types";
import styles from "./styles";

const FullWidthCaption = ({ text, credits }) => (
  <View style={styles.fullwidthCaption}>
    <CentredCaption credits={credits} text={text} />
  </View>
);

FullWidthCaption.propTypes = propTypes;
FullWidthCaption.defaultProps = defaultProps;

export default FullWidthCaption;
