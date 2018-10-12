import React from "react";
import { ParagraphContainer, DropCap, ArticleText } from "./styles/index.web";
import { propTypes, defaultProps } from "./prop-types";

function DropCapParagraph({ colour, dropCap, text }) {
  return (
    <ParagraphContainer>
      <DropCap style={{ color: colour }}>{dropCap}</DropCap>
      <ArticleText>{text}</ArticleText>
    </ParagraphContainer>
  );
}

DropCapParagraph.propTypes = propTypes;

DropCapParagraph.defaultProps = defaultProps;

export default DropCapParagraph;
