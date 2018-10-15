import React from "react";
import PropTypes from "prop-types";
import { renderTreeAsText } from "@times-components/markup-forest";
import ArticleParagraph from "./article-paragraph"
import DropCapWrapper from "./drop-cap-with-context";

const ArticleParagraphWrapper = (props) => {
  const { ast, children, colour } = props;
  const { children: astChildren } = ast;
  const [{ name, attributes: { value } }, ...rest] = astChildren;
  if (name === "dropCap") {
    const text = renderTreeAsText(ast).slice(1);
    return (<DropCapWrapper
      colour={colour}
      dropCap={value} key={`paragraph-${props.uid}`} testID={`paragraph-${props.uid}`} text={text} />);
  }
  return (<ArticleParagraph
    key={`paragraph-${props.uid}`}
    testID={`paragraph-${props.uid}`}>
    {children}
  </ArticleParagraph>);
}

ArticleParagraphWrapper.propTypes = {
  ast: PropTypes.object.isRequired,
  uid: PropTypes.number.isRequired
};

export default ArticleParagraphWrapper;
