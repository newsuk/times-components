import React from "react";
import PropTypes from "prop-types";
import { Paragraph } from "./styles/responsive";

const BodyParagraph = ({ children }) => <Paragraph>{children}</Paragraph>;

BodyParagraph.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  ).isRequired
};

export default BodyParagraph;
