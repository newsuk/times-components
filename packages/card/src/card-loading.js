import React from "react";
import { View } from "react-native";
import Gradient from "@times-components/gradient";
import { sharedPropTypes, sharedDefaultProps } from "./card-shared-prop-types";
import styles from "./styles";

const Loading = ({ contentContainerClass, isReversed }) => (
  <View
    className={contentContainerClass}
    style={[
      styles.contentContainer,
      isReversed ? styles.reversedContentContainer : ""
    ]}
  >
    <Gradient degrees={264} style={[styles.headerContainer]} />
    <Gradient degrees={267} style={[styles.textContainer]} />
    <Gradient degrees={267} style={[styles.textContainer]} />
    <Gradient degrees={267} style={[styles.textContainer, styles.lastBar]} />
  </View>
);

Loading.propTypes = sharedPropTypes;
Loading.defaultProps = sharedDefaultProps;

export default Loading;
