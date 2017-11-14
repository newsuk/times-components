import React from "react";
import PropTypes from "prop-types";
import { ScrollView } from "react-native";

const ArticleContent = ({ data, renderRow }) => (
  <ScrollView>{data.map(item => renderRow(item))}</ScrollView>
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
