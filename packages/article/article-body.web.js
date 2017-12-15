import React from "react";
import PropTypes from "prop-types";
import ArticleRow from "./article-body-row";

const ArticleBody = props => {
  const contentArray = props.content.map((data, index) => ({
    data,
    index
  }));

  const BodyView = contentArray.map(content => (
    <ArticleRow key={`cont-${content.index}`} content={content} />
  ));

  return BodyView;
};

ArticleBody.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      attributes: PropTypes.object,
      children: PropTypes.arrayOf(PropTypes.object),
      name: PropTypes.string
    })
  ).isRequired
};

export default ArticleBody;
