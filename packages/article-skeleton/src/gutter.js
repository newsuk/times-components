import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { tabletWidthMax } from "@times-components/styleguide";
import styles from "./styles/shared";

export const maxWidth = tabletWidthMax;

const Gutter = ({ children }) => <View style={styles.gutter}>{children}</View>;

Gutter.propTypes = {
  children: PropTypes.node.isRequired
};

export default Gutter;
