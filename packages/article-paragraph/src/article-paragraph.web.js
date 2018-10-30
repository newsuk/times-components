import React from "react";
import PropTypes from "prop-types";
import { Paragraph } from "./styles/responsive";
import styles from "./styles";

const BodyParagraph = props => (
  <Paragraph style={[styles.articleTextElement]}>{props.children}</Paragraph>
);

BodyParagraph.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  ).isRequired
};

export default BodyParagraph;
