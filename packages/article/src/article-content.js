import React from "react";
import PropTypes from "prop-types";
import { FlatList } from "react-native";

const ArticleContent = ({
  data,
  renderRow,
  onAuthorPress,
  onLinkPress,
  onRelatedArticlePress,
  onTopicPress,
  onVideoPress
}) => (
  <FlatList
    testID="flat-list-article"
    keyExtractor={item => item.type + item.index || item.type}
    data={data}
    renderItem={({ item }) =>
      renderRow(
        item,
        onAuthorPress,
        onLinkPress,
        onRelatedArticlePress,
        onTopicPress,
        onVideoPress
      )
    }
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
  renderRow: PropTypes.func.isRequired,
  onAuthorPress: PropTypes.func.isRequired,
  onLinkPress: PropTypes.func.isRequired,
  onRelatedArticlePress: PropTypes.func.isRequired,
  onTopicPress: PropTypes.func.isRequired,
  onVideoPress: PropTypes.func.isRequired
};

export default ArticleContent;
