import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

const baseStyle = `
  align-items: stretch;
  flex-direction: column;
`;
const mediumStyle = `
  margin-top: 30px
`;
const ContainerWithResults = withResponsiveStyles(View, {
  base: () => baseStyle,
  mediumUp: () => mediumStyle
});

const ContainerWithoutResults = withResponsiveStyles(View, {
  base: () => baseStyle
});

const PaginationContainer = ({ children, hideResults }) =>
  hideResults ? (
    <ContainerWithoutResults>{children}</ContainerWithoutResults>
  ) : (
    <ContainerWithResults>{children}</ContainerWithResults>
  );

PaginationContainer.propTypes = {
  children: PropTypes.node.isRequired,
  hideResults: PropTypes.bool
};

PaginationContainer.defaultProps = {
  hideResults: false
};

export default PaginationContainer;
