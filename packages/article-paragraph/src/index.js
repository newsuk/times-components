import React from "react";
import PropTypes from "prop-types";
import { renderTree, renderTreeAsText } from "@times-components/markup-forest";
import ArticleParagraph from "./article-paragraph"
import DropCapWrapper from "./drop-cap-with-context";

const ArticleParagraphWrapper = ({ ast, colour }) => {
  const { children, attributes } = ast;
  const [{ name, attributes: { value } }, ...rest] = children;
  if (name === "dropCap") {
    return (<DropCapWrapper colour={colour} dropCapText={value} text={"renderTreeAsText(rest)"} />);
  } else {
    return (null);
  }
}

ArticleParagraphWrapper.propTypes = {
  ast: PropTypes.object.isRequired,
  uid: PropTypes.number.isRequired
};

export default ArticleParagraphWrapper;
