import React, { useCallback, useState, useMemo } from "react";
import { View, FlatList, ActivityIndicator, Platform } from "react-native";
import PropTypes from "prop-types";
import { screenWidth } from "@times-components/utils";
import { withTrackScrollDepth } from "@times-components/tracking";
import { Viewport } from "@skele/components";
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
import ErrorBoundary from "./boundary";

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

const ArticleWithContent = props => {
  const {
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

  const { id, url, content } = data;

  const onViewableItemsChanged = useCallback(info => {
    if (!onViewed || !info.changed || !info.changed.length) return [];

    return info.changed
      .filter(viewableItem => viewableItem.isViewable)
      .map(viewableItem => onViewed(viewableItem.item, data));
  }, []);

  const [loading, setLoading] = useState(true);
  const Loading = useCallback(
    () => (
      <Gutter>
        <ActivityIndicator size="large" animating={loading} />
      </Gutter>
    ),
    [loading]
  );

  const onEndReached = () => {
    setLoading(false);
  };

  const header = useMemo(
    () => (
      <Gutter>
        <Header width={Math.min(maxWidth, screenWidth())} />
      </Gutter>
    ),
    []
  );

  const footer = useMemo(
    () => (
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
    ),
    []
  );

  const fixedContent = useMemo(
    () => [...fixup(isTablet, content), { name: "footer" }],
    [content, isTablet]
  );
  const images = fixedContent.filter(node => node.name === "image");

  const dropcapsDisabled = isDropcapsDisabled(data);
  const renderChild = render(renderers({ dropcapsDisabled, ...props, images }));
  // eslint-disable-next-line react/prop-types
  const Child = useCallback(
    ({ item, index }) => (
      <Gutter style={{ overflow: "hidden" }}>
        <ErrorBoundary>
          {item.name === "footer"
            ? footer
            : renderChild(item, index.toString(), index)}
        </ErrorBoundary>
      </Gutter>
    ),
    [footer]
  );

  // FIXME: remove this when ios memory leaks are resolved
  const Scroller = React.useCallback(
    scrollprops =>
      Platform.select({
        ios: (
          <FlatList
            {...scrollprops}
            data={scrollprops.data.map((item, index) => Child({ item, index }))}
            renderItem={({ item }) => item}
          />
        ),
        android: <FlatList {...scrollprops} />
      }),
    [Child]
  );

  return (
    <View style={styles.articleContainer}>
      <Viewport.Tracker>
        <Scroller
          data={fixedContent}
          extraData={loading}
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
  );
};

ArticleWithContent.propTypes = {
  ...articleSkeletonPropTypes,
  interactiveConfig: PropTypes.shape({}),
  onCommentGuidelinesPress: PropTypes.func.isRequired,
  onCommentsPress: PropTypes.func.isRequired,
  onLinkPress: PropTypes.func.isRequired,
  onRelatedArticlePress: PropTypes.func.isRequired,
  onTwitterLinkPress: PropTypes.func.isRequired,
  onVideoPress: PropTypes.func.isRequired,
  onImagePress: PropTypes.func.isRequired
};
ArticleWithContent.defaultProps = {
  ...articleSkeletonDefaultProps,
  interactiveConfig: {}
};

const ArticleSkeleton = props => {
  const { data } = props;

  if (!data) {
    return null;
  }

  const { content } = data;

  if (!content) {
    return null;
  }

  return <ArticleWithContent {...props} />;
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
  onVideoPress: PropTypes.func.isRequired,
  onImagePress: PropTypes.func.isRequired
};
ArticleSkeleton.defaultProps = {
  ...articleSkeletonDefaultProps,
  interactiveConfig: {}
};

export default articleTrackingContext(withTrackScrollDepth(ArticleSkeleton));
