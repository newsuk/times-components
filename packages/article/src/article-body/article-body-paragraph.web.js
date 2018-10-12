import React from "react";
import PropTypes from "prop-types";
import {
  ParagraphContainer,
  Paragraph
} from "../styles/article-body/responsive";
import styles from "../styles/article-body";

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
