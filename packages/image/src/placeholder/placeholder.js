/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
import { PlaceHolderWrapper } from "../styles/index";
import T from "../logo/t";

function Placeholder({ borderRadius = 0 }) {
  const additionalStyles = borderRadius ? { borderRadius } : {};
  return (
    <PlaceHolderWrapper height="100%" style={additionalStyles} width="100%">
      <T />
    </PlaceHolderWrapper>
  );
}

Placeholder.propTypes = {
  borderRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default Placeholder;
