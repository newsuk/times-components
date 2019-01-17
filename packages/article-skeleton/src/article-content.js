import React from "react";
import PropTypes from "prop-types";
import { FlatList } from "react-native";

const viewabilityConfig = {
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: false
};

const ArticleContent = ({
  data,
  Header,
  interactiveConfig,
  onAuthorPress,
  onCommentsPress,
  onCommentGuidelinesPress,
  onLinkPress,
  onRelatedArticlePress,
  onTopicPress,
  onTwitterLinkPress,
  onVideoPress,
  onViewableItemsChanged,
  renderRow,
  width
}) => (
  <FlatList
    data={data}
    keyExtractor={item =>
      item.index ? `${item.type}.${item.index}` : item.type
    }
    ListHeaderComponent={<Header width={width} />}
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
        onVideoPress,
        interactiveConfig
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
  Header: PropTypes.func,
  interactiveConfig: PropTypes.shape({}),
  onAuthorPress: PropTypes.func.isRequired,
  onCommentGuidelinesPress: PropTypes.func.isRequired,
  onCommentsPress: PropTypes.func.isRequired,
  onLinkPress: PropTypes.func.isRequired,
  onRelatedArticlePress: PropTypes.func.isRequired,
  onTopicPress: PropTypes.func.isRequired,
  onTwitterLinkPress: PropTypes.func.isRequired,
  onVideoPress: PropTypes.func.isRequired,
  onViewableItemsChanged: PropTypes.func,
  renderRow: PropTypes.func.isRequired,
  width: PropTypes.number
};

ArticleContent.defaultProps = {
  Header: () => null,
  interactiveConfig: {},
  onViewableItemsChanged: () => {},
  width: null
};

export default ArticleContent;
