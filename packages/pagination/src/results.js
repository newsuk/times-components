import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import { breakpoints } from "@times-components/ts-styleguide";
import ResultsMessage from "./results-message";

const MessageContainer = styled(View)`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  height: 50px;

  @media (min-width: ${breakpoints.medium}px) {
    left: 0;
    right: 0;
    position: absolute;
  }
`;

const Results = ({ children: message }) => (
  <MessageContainer>
    <ResultsMessage>{message}</ResultsMessage>
  </MessageContainer>
);

Results.propTypes = {
  children: PropTypes.string.isRequired
};

export default Results;
