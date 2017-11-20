import React from "react";
import PropTypes from "prop-types";
import { ScrollView } from "react-native";

const ArticleContent = ({ data, renderRow }) => (
  <ScrollView testID="scroll-view-article">
    {data.map(item => renderRow(item))}
  </ScrollView>
);

ArticleContent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderRow: PropTypes.func.isRequired
};

export default ArticleContent;
