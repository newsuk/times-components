import React from "react";
import { View } from "react-native";
import { ResponsiveContext } from "@times-components/responsive";
import propTypes from "./key-facts-shared-prop-types";
import styles from "./styles";

const KeyFactsContainer = ({ children }) => (
  <ResponsiveContext.Consumer>
    {({ isTablet }) => (
      <View style={[styles.container, isTablet && styles.containerTablet]}>
        {children}
      </View>
    )}
  </ResponsiveContext.Consumer>
);

KeyFactsContainer.propTypes = propTypes;

export default KeyFactsContainer;
