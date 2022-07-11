import React from "react";
import PropTypes from "prop-types";
import { TcText, checkStylesForUnits } from "@times-components/utils";
import { colours, fontFactory } from "@times-components/ts-styleguide";

const styles = {
  message: {
    color: colours.functional.secondary,
    ...fontFactory({
      font: "supporting",
      fontSize: "pagingMeta"
    }),
    paddingTop: 4
  }
};

const ResultsMessage = ({ children: message }) => (
  <TcText style={checkStylesForUnits(styles.message)} testID="results-message">
    {message}
  </TcText>
);

ResultsMessage.propTypes = {
  children: PropTypes.string.isRequired
};

export default ResultsMessage;
