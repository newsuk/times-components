import React from "react";
import PropTypes from "prop-types";
import { ParagraphContainer, Paragraph } from "./styles/responsive";
import styles from "./styles";

const BodyParagraph = props => (
  <ParagraphContainer style={[styles.articleMainContentRow]}>
    <Paragraph style={[styles.articleTextElement]}>{props.children}</Paragraph>
  </ParagraphContainer>
);

BodyParagraph.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  ).isRequired
};

export default BodyParagraph;
