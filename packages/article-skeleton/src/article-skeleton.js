import React, { useCallback, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { screenWidth } from "@times-components/utils";
import { withTrackScrollDepth } from "@times-components/tracking";
import { Viewport } from "@skele/components";
import { AdComposer } from "@times-components/ad";
import { render } from "@times-components/markup-forest";
import ArticleExtras from "@times-components/article-extras";
import {
  articleSkeletonPropTypes,
  articleSkeletonDefaultProps
} from "./article-skeleton-prop-types";
import articleTrackingContext from "./tracking/article-tracking-context";
import Gutter, { maxWidth } from "./gutter";
import styles from "./styles/shared";
import renderers from "./article-body/article-body-row";
import fixup from "./body-utils";

const templateWithDropCaps = [
  "indepth",
  "maincomment",
  "magazinestandard",
  "magazinecomment"
];

const isDropcapsDisabled = ({ template, dropcapsDisabled }) => {
  if (dropcapsDisabled) {
    return true;
  }
  return !templateWithDropCaps.includes(template);
};

const ArticleSkeleton = props => {
  const {
    adConfig,
    Header,
    data,
    analyticsStream,
    onCommentGuidelinesPress,
    onCommentsPress,
    onRelatedArticlePress,
    onTopicPress,
    isTablet,
    onViewed
  } = props;

  const onViewableItemsChanged = useCallback(
    info => {
      if (!onViewed || !info.changed || !info.changed.length) return [];

      return info.changed
        .filter(viewableItem => viewableItem.isViewable)
        .map(viewableItem => onViewed(viewableItem.item, data));
    },
    [data, onViewed]
  );

  const [loading, setLoading] = useState(true);
  const Loading = useCallback(
    () =>
      loading ? (
        <Gutter>
          <ActivityIndicator size="large" />
        </Gutter>
      ) : null,
    [loading]
  );

  const onEndReached = useCallback(() => {
    setLoading(false);
  }, []);

  if (!data) {
    return null;
  }

  const { id, url, content } = data;

  if (!content) {
    return null;
  }

  const header = (
    <Gutter>
      <Header width={Math.min(maxWidth, screenWidth())} />
    </Gutter>
  );

  const footer = (
    <Gutter>
      <ArticleExtras
        analyticsStream={analyticsStream}
        articleId={id}
        articleUrl={url}
        onCommentGuidelinesPress={onCommentGuidelinesPress}
        onCommentsPress={onCommentsPress}
        onRelatedArticlePress={onRelatedArticlePress}
        onTopicPress={onTopicPress}
      />
    </Gutter>
  );

  const dropcapsDisabled = isDropcapsDisabled(data);
  const renderChild = render(renderers({ dropcapsDisabled, ...props }));
  // eslint-disable-next-line react/prop-types
  const Child = ({ item, index }) => (
    <Gutter style={{ overflow: "hidden" }}>
      {item.name === "footer"
        ? footer
        : renderChild(item, index.toString(), index)}
    </Gutter>
  );

  const fixedContent = [...fixup(isTablet, content), { name: "footer" }];

  return (
    <AdComposer adConfig={adConfig}>
      <View style={styles.articleContainer}>
        <Viewport.Tracker>
          <FlatList
            data={fixedContent}
            ListEmptyComponent={Loading}
            ListHeaderComponent={header}
            ListFooterComponent={Loading}
            onEndReached={onEndReached}
            showsVerticalScrollIndicator={false}
            renderItem={Child}
            onViewableItemsChanged={onViewableItemsChanged}
            removeClippedSubviews
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={2}
            windowSize={3}
            nestedScrollEnabled
            testID="flat-list-article"
          />
        </Viewport.Tracker>
      </View>
    </AdComposer>
  );
};

ArticleSkeleton.displayName = "ArticleSkeleton";

ArticleSkeleton.propTypes = {
  ...articleSkeletonPropTypes,
  interactiveConfig: PropTypes.shape({}),
  onCommentGuidelinesPress: PropTypes.func.isRequired,
  onCommentsPress: PropTypes.func.isRequired,
  onLinkPress: PropTypes.func.isRequired,
  onRelatedArticlePress: PropTypes.func.isRequired,
  onTwitterLinkPress: PropTypes.func.isRequired,
  onVideoPress: PropTypes.func.isRequired
};
ArticleSkeleton.defaultProps = {
  ...articleSkeletonDefaultProps,
  interactiveConfig: {}
};

export default articleTrackingContext(withTrackScrollDepth(ArticleSkeleton));
