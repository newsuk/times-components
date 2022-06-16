import React from "react";
import { TcText } from "@times-components/utils";
import styled from "styled-components";
import { breakpoints } from "@times-components/ts-styleguide";
import PropTypes from "prop-types";

const labelStyle = { color: "inherit", font: "inherit", whiteSpace: "inherit" };
const ResponsiveLabel = styled(TcText)`
  display: none;

  @media (min-width: ${breakpoints.medium}px) {
    display: inline;
  }
`;

const PageLabel = ({ direction }) => (
  <TcText style={labelStyle}>
    {direction}
    <ResponsiveLabel style={labelStyle}> page</ResponsiveLabel>
  </TcText>
);

PageLabel.propTypes = {
  direction: PropTypes.string.isRequired
};

export default PageLabel;
