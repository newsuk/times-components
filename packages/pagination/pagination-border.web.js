import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

const baseStyle = `
  border-style: solid;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
  border-bottom-color: #dbdbdb;
  border-bottom-width: 1px;
  border-top-color: #dbdbdb;
  border-top-width: 1px;
`;
const mediumStyle = `
  border-top-width: 0px;
`;

const BorderWithResults = withResponsiveStyles(View, {
  base: () => baseStyle,
  mediumUp: () => mediumStyle
});

const BorderWithoutResults = withResponsiveStyles(View, {
  base: () => baseStyle
});

const PaginationBorder = ({ children, hideResults }) =>
  hideResults ? (
    <BorderWithoutResults>{children}</BorderWithoutResults>
  ) : (
    <BorderWithResults>{children}</BorderWithResults>
  );

PaginationBorder.propTypes = {
  children: PropTypes.node.isRequired,
  hideResults: PropTypes.bool
};

PaginationBorder.defaultProps = {
  hideResults: false
};

export default PaginationBorder;
