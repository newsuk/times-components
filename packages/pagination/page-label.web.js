import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";

import withResponsiveStyles from "@times-components/responsive-styles";

const ResponsiveLabel = withResponsiveStyles(Text, {
  base: () => "display: none;",
  mediumUp: () => "display: inline;"
});

const PageLabel = ({ direction }) => (
  <Text>
    {direction}
    <ResponsiveLabel> page</ResponsiveLabel>
  </Text>
);

PageLabel.propTypes = {
  direction: PropTypes.string.isRequired
};

export default PageLabel;
