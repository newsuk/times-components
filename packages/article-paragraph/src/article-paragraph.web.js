import React from "react";
import PropTypes from "prop-types";
import { Paragraph } from "./styles/responsive";
import styles from "./styles";

const BodyParagraph = ({ children }) => (
  <Paragraph style={styles.articleTextElement}>{children}</Paragraph>
);

BodyParagraph.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  ).isRequired
};

export default BodyParagraph;
