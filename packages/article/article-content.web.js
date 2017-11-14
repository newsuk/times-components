import React from "react";
import PropTypes from "prop-types";
import { ScrollView, View } from "react-native";

const ArticleContent = ({ data, renderRow }) => (
  <ScrollView>
    {data.map(item => {
      return renderRow(item);
    })}
  </ScrollView>
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
