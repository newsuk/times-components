import React, { memo } from "react";
import { View, VirtualizedList } from "react-native";
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

  const onViewableItemsChanged = info => {
    if (!info.changed || !info.changed.length) return [];

    return info.changed
      .filter(viewableItem => viewableItem.isViewable)
      .map(viewableItem => onViewed(viewableItem.item, data));
  };

  if (!data) {
    return null;
  }

  const { id, url, content } = data;

  if (!content) {
    return null;
  }

  const header = <Header width={Math.min(maxWidth, screenWidth())} />;

  const Footer = () => (
    <ArticleExtras
      analyticsStream={analyticsStream}
      articleId={id}
      articleUrl={url}
      onCommentGuidelinesPress={onCommentGuidelinesPress}
      onCommentsPress={onCommentsPress}
      onRelatedArticlePress={onRelatedArticlePress}
      onTopicPress={onTopicPress}
    />
  );

  const dropcapsDisabled = isDropcapsDisabled(data);

  const renderChild = render(renderers({ dropcapsDisabled, ...props }));
  const Child = memo(({ item, index }) =>
    renderChild(item, index.toString(), index)
  );

  const collapsed = !isTablet
    ? content
    : content.reduceRight((acc, node) => {
        // backwards
        if (
          (node.name === "image" && node.attributes.display === "inline") ||
          node.name === "pullQuote"
        ) {
          // forwards
          let i;
          let children = [node];
          for (i = 0; i < acc.length; i += 1) {
            const next = acc[i];
            if (next && next.name === "paragraph") {
              children = [
                ...children,
                ...next.children,
                { name: "break", children: [] },
                { name: "break", children: [] }
              ];
            } else {
              break;
            }
          }
          return [
            {
              ...acc[0],
              children
            },
            ...acc.slice(i)
          ];
        }
        return [node, ...acc];
      }, []);

  return (
    <AdComposer adConfig={adConfig}>
      <View style={styles.articleContainer}>
        <Viewport.Tracker>
          <VirtualizedList
            data={collapsed}
            showsVerticalScrollIndicator={false}
            getItemCount={d => (d ? d.length + 2 : 0)}
            getItem={(d, i) => {
              if (i === 0) {
                return "header";
              }
              if (i === d.length + 1) {
                return "footer";
              }
              return d[i - 1];
            }}
            renderItem={childProps => (
              <Gutter style={{ overflow: "hidden" }}>
                {childProps.item === "header" && header}
                {childProps.item === "footer" && <Footer />}
                {typeof childProps.item === "object" && (
                  <Child {...childProps} />
                )}
              </Gutter>
            )}
            keyExtractor={(item, index) => index.toString()}
            onViewableItemsChanged={onViewed ? onViewableItemsChanged : null}
            removeClippedSubviews
            initialNumToRender={3}
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
