import React from "react";
import { Text } from "react-native";
import styled from "styled-components";
import { breakpoints } from "@times-components/ts-styleguide";
import PropTypes from "prop-types";

const ResponsiveLabel = styled(Text)`
  display: none;

  @media (min-width: ${breakpoints.medium}px) {
    display: inline;
  }
`;

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
