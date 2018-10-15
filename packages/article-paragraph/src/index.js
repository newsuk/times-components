import React from "react";
import PropTypes from "prop-types";
import { renderTree, renderTreeAsText } from "@times-components/markup-forest";
import ArticleParagraph from "./article-paragraph"
import DropCapWrapper from "./drop-cap-with-context";

const ArticleParagraphWrapper = (props) => {
  const { ast } = props;
  const { children, attributes } = ast;
  const [{ name, attributes: { value } }, ...rest] = children;
  if (name === "dropCap") {
    return (<DropCapWrapper dropCapText={value} text={"renderTreeAsText(rest)"} {...props} />);
  } else {
    return (null);
  }
}

ArticleParagraphWrapper.propTypes = {
  ast: PropTypes.object.isRequired,
  uid: PropTypes.number.isRequired
};

export default ArticleParagraphWrapper;
