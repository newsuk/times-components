import React from "react";
import PropTypes from "prop-types";
import ArticleRow from "./article-body-row";

const ArticleBody = props => {
  const { section, content: bodyContent, contextUrl, onLinkPress } = props;
  const contentArray = bodyContent.map((rowData, index) => {
    const item = {
      data: Object.assign({}, rowData),
      index
    };
    if (rowData.name === "ad") {
      item.data.attributes = {
        ...item.data.attributes,
        ...{ section, contextUrl }
      };
    }
    return item;
  });
  const BodyView = contentArray.map(content => (
    <ArticleRow
      key={`cont-${content.index}`}
      content={content}
      onLinkPress={onLinkPress}
    />
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
  section: PropTypes.string,
  contextUrl: PropTypes.string.isRequired,
  onLinkPress: PropTypes.func.isRequired
};

export default ArticleBody;
