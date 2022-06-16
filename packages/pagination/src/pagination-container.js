import React from "react";
import { TcView } from "@times-components/utils";
import styled from "styled-components";
import PropTypes from "prop-types";
import { breakpoints, spacing } from "@times-components/ts-styleguide";

const ContainerWithResults = styled(TcView)`
  align-items: stretch;
  flex-direction: column;

  @media (min-width: ${breakpoints.medium}px) {
    margin-top: ${spacing(6)};
  }
`;

const ContainerWithoutResults = styled(TcView)`
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
