import React from "react";
import { FlatList } from "react-native";

const ArticleContent = ({
  data,
  renderRow,
  initialListSize,
  scrollRenderAheadDistance,
  pageSize
}) => (
  <FlatList
    testID="scroll-view-article"
    keyExtractor={item => item.type + item.index || item.type}
    data={data}
    renderItem={({ item }) => renderRow(item)}
    initialListSize={initialListSize}
    scrollRenderAheadDistance={scrollRenderAheadDistance}
    pageSize={pageSize}
  />
);

ArticleContent.propTypes = {};

ArticleContent.defaultProps = {};

export default ArticleContent;
