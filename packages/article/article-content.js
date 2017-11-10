import React from "react";
import PropTypes from "prop-types";
import { FlatList } from "react-native";

const ArticleContent = ({
  data,
  renderRow
}) => (
  <FlatList
    testID="scroll-view-article"
    keyExtractor={item => item.type + item.index || item.type}
    data={data}
    renderItem={({ item }) => renderRow(item)}
  />
);

ArticleContent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  renderRow: PropTypes.func
};

ArticleContent.defaultProps = {
  data: [],
  renderRow: null
};

export default ArticleContent;
