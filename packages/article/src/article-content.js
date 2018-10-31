import React from "react";
import PropTypes from "prop-types";
import { FlatList } from "react-native";

const viewabilityConfig = {
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: false
};

const ArticleContent = ({
  data,
  header,
  onAuthorPress,
  onCommentsPress,
  onCommentGuidelinesPress,
  onLinkPress,
  onRelatedArticlePress,
  onTopicPress,
  onTwitterLinkPress,
  onVideoPress,
  onViewableItemsChanged,
  renderRow
}) => (
  <FlatList
    data={data}
    keyExtractor={item =>
      item.index ? `${item.type}.${item.index}` : item.type
    }
    ListHeaderComponent={header}
    onViewableItemsChanged={onViewableItemsChanged}
    renderItem={({ item }) =>
      renderRow(
        item,
        onAuthorPress,
        onCommentsPress,
        onCommentGuidelinesPress,
        onLinkPress,
        onRelatedArticlePress,
        onTopicPress,
        onTwitterLinkPress,
        onVideoPress
      )
    }
    testID="flat-list-article"
    viewabilityConfig={viewabilityConfig}
  />
);

ArticleContent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.object.isRequired,
      index: PropTypes.number,
      type: PropTypes.string.isRequired
    })
  ).isRequired,
  header: PropTypes.func,
  onAuthorPress: PropTypes.func.isRequired,
  onCommentGuidelinesPress: PropTypes.func.isRequired,
  onCommentsPress: PropTypes.func.isRequired,
  onLinkPress: PropTypes.func.isRequired,
  onRelatedArticlePress: PropTypes.func.isRequired,
  onTopicPress: PropTypes.func.isRequired,
  onTwitterLinkPress: PropTypes.func.isRequired,
  onVideoPress: PropTypes.func.isRequired,
  onViewableItemsChanged: PropTypes.func,
  renderRow: PropTypes.func.isRequired
};

ArticleContent.defaultProps = {
  header: () => null,
  onViewableItemsChanged: () => {}
};

export default ArticleContent;
