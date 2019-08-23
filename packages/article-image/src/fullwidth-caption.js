import React from "react";
import { View } from "react-native";
import { CentredCaption } from "@times-components/caption";
import { propTypes, defaultProps } from "./fullwidth-caption-prop-types";
import styles from "./styles";

const FullWidthCaption = props => (
  <View style={styles.fullwidthCaption}>
    <CentredCaption {...props} />
  </View>
);

FullWidthCaption.propTypes = propTypes;
FullWidthCaption.defaultProps = defaultProps;

export default FullWidthCaption;
