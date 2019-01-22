import React from "react";
import { Text } from "react-native";
import { ResponsiveContext } from "@times-components/responsive";
import propTypes from "./key-facts-title-prop-types";
import styles from "./styles";

const KeyFactsTitle = ({ color, fontStyle, title }) => (
  <ResponsiveContext.Consumer>
    {({ isTablet }) => (
      <Text
        style={[
          styles.title,
          isTablet && styles.titleTablet,
          { color },
          fontStyle
        ]}
      >
        {title.toUpperCase()}
      </Text>
    )}
  </ResponsiveContext.Consumer>
);

KeyFactsTitle.propTypes = propTypes;

export default KeyFactsTitle;
