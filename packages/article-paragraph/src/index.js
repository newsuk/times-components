/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import { renderTreeAsText } from "@times-components/markup-forest";
import ArticleParagraph from "./article-paragraph";
import DropCapWrapper from "./drop-cap-with-context";
import { propTypes, defaultProps } from "./drop-cap-prop-types";

const ArticleParagraphWrapper = props => {
  const { ast, children, colour } = props;
  const { children: astChildren } = ast;
  const { name, attributes } = astChildren[0];
  if (name === "dropCap") {
    const { value } = attributes;
    const text = renderTreeAsText(ast).slice(1);
    return (
      <DropCapWrapper
        colour={colour}
        dropCap={value}
        key={`paragraph-${props.uid}`}
        testID={`paragraph-${props.uid}`}
        text={text}
      />
    );
  }
  return (
    <ArticleParagraph
      key={`paragraph-${props.uid}`}
      testID={`paragraph-${props.uid}`}
    >
      {children}
    </ArticleParagraph>
  );
};

ArticleParagraphWrapper.propTypes = {
  ...propTypes,
  ast: PropTypes.object.isRequired,
  uid: PropTypes.number.isRequired
};

ArticleParagraphWrapper.defaultProps = defaultProps;

export default ArticleParagraphWrapper;
