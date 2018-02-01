import React from "react";
import PropTypes from "prop-types";
import { FlatList } from "react-native";

const ArticleContent = ({ data, renderRow }) => (
  <FlatList
    testID="flat-list-article"
    keyExtractor={item => item.type + item.index || item.type}
    data={data}
    renderItem={({ item }) => renderRow(item)}
  />
);

ArticleContent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.object.isRequired,
      type: PropTypes.string.isRequired,
      index: PropTypes.number
    })
  ).isRequired,
  renderRow: PropTypes.func.isRequired
};


export default ArticleContent;
