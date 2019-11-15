import React from "react";
import { Text } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import stylefactory from "./styles";

const styles = stylefactory(editionBreakpoints.small);

export default {
  bold(key, attributes, renderedChildren) {
    return (
      <Text key={key} style={styles.bold}>
        {renderedChildren}
      </Text>
    );
  }
};
