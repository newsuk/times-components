import React from "react";
import PropTypes from "prop-types";
import { ListView } from "react-native";

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const ArticleContent = ({
  data,
  renderRow,
  initialListSize,
  scrollRenderAheadDistance,
  pageSize
}) => (
  <ListView
    testID="listView"
    dataSource={ds.cloneWithRows(data)}
    renderRow={renderRow}
    initialListSize={initialListSize}
    scrollRenderAheadDistance={scrollRenderAheadDistance}
    pageSize={pageSize}
    enableEmptySections
  />
);

ArticleContent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  renderRow: PropTypes.func,
  initialListSize: PropTypes.number,
  scrollRenderAheadDistance: PropTypes.number,
  pageSize: PropTypes.number
};

ArticleContent.defaultProps = {
  data: [],
  renderRow: null,
  initialListSize: 0,
  scrollRenderAheadDistance: 0,
  pageSize: 0
};

export default ArticleContent;
