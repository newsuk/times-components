import React from "react";
import PropTypes from "prop-types";
import { FlatList } from "react-native";

const ArticleContent = ({
  data,
  renderRow,
  onAuthorPress,
  onCommentsPress,
  onCommentGuidelinesPress,
  onLinkPress,
  onRelatedArticlePress,
  onTopicPress,
  onTwitterLinkPress,
  onVideoPress
}) => (
  <FlatList
    data={data}
    keyExtractor={item =>
      item.index ? `${item.type}.${item.index}` : item.type
    }
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
  onAuthorPress: PropTypes.func.isRequired,
  onCommentGuidelinesPress: PropTypes.func.isRequired,
  onCommentsPress: PropTypes.func.isRequired,
  onLinkPress: PropTypes.func.isRequired,
  onRelatedArticlePress: PropTypes.func.isRequired,
  onTopicPress: PropTypes.func.isRequired,
  onTwitterLinkPress: PropTypes.func.isRequired,
  onVideoPress: PropTypes.func.isRequired,
  renderRow: PropTypes.func.isRequired
};

export default ArticleContent;
