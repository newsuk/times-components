import React from "react";
import PropTypes from "prop-types";
import ArticleRow from "./article-body-row";

const ArticleBody = props => {
  const { section, content: bodyContent } = props;
  const contentArray = bodyContent.map((data, index) => {
    const item = {
      data,
      index
    };
    if (data.name === "ad") {
      item.data.attributes = { ...item.data.attributes, ...{ section } };
    }
    return item;
  });
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
  ).isRequired,
  section: PropTypes.string
};

export default ArticleBody;
