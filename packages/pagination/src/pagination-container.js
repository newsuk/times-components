import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import { breakpoints, spacing } from "@times-components/styleguide";

const ContainerWithResults = styled(View)`
  align-items: stretch;
  flex-direction: column;

  @media (min-width: ${breakpoints.medium}px) {
    margin-top: ${spacing(6)};
  }
`;

const ContainerWithoutResults = styled(View)`
  align-items: stretch;
  flex-direction: column;
`;

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
