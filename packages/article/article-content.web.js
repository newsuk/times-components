import React from "react";
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

ArticleContent.propTypes = {};

ArticleContent.defaultProps = {};

export default ArticleContent;
