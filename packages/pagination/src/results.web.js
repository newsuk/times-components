import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

import ResultsMessage from "./results-message";

const MessageContainer = withResponsiveStyles(View, {
  base: () => `
    align-items: center;
    flex-direction: row;
    justify-content: center;
    height: 50px;
  `,
  mediumUp: () => `
    left: 0;
    right: 0;
    position: absolute;
  `
});

const Results = ({ children: message }) => (
  <MessageContainer>
    <ResultsMessage>{message}</ResultsMessage>
  </MessageContainer>
);

Results.propTypes = {
  children: PropTypes.string.isRequired
};

export default Results;
