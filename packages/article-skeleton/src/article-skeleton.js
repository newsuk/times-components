/* eslint-disable consistent-return,no-param-reassign,camelcase,react/sort-comp */
import React, { PureComponent, Fragment } from "react";
import { View, FlatList, Text, Dimensions } from "react-native";
import PropTypes from "prop-types";
import { AdComposer } from "@times-components/ad";
import { ResponsiveContext } from "@times-components/responsive";
import { withTrackScrollDepth } from "@times-components/tracking";
import { screenWidth } from "@times-components/utils";
import ArticleExtras from "@times-components/article-extras";
import { Layout, Text as FText } from "@times-components/text-flow";
import {
  tabletWidth,
  tabletWidthMax,
  colours
} from "@times-components/styleguide";
import { Viewport } from "@skele/components";
import memoize from "memoize-one";
import ArticleRowFlow from "./article-body/article-body-row";
import {
  articleSkeletonPropTypes,
  articleSkeletonDefaultProps
} from "./article-skeleton-prop-types";
import listViewDataHelper from "./data-helper";
import articleTrackingContext from "./tracking/article-tracking-context";
import insertDropcapIntoAST from "./dropcap-util";
import styles from "./styles/shared";
import Gutter, { maxWidth } from "./gutter";

const listViewPageSize = 1;
const listViewSize = 10;
const listViewScrollRenderAheadDistance = 10;

const viewabilityConfig = {
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: false
};

const convertStyles = ({ font, size }) => {
  const { fontScale } = Dimensions.get("window");
  return {
    fontFamily: font.replace(/-Bold|-Italic/gi, ""),
    fontSize: size / fontScale,
    fontStyle: font.includes("Italic") ? "italic" : "normal",
    fontWeight: font.includes("Bold") ? "bold" : "normal"
  };
};

const renderRow = (
  rowData,
  onCommentsPress,
  onCommentGuidelinesPress,
  onRelatedArticlePress,
  onTopicPress,
  analyticsStream
) => {
  // eslint-disable-next-line default-case
  switch (rowData.type) {
    case "articleBodyRow": {
      return rowData.data;
    }

    case "articleExtrasRow": {
      return (
        <ArticleExtras
          analyticsStream={analyticsStream}
          articleId={rowData.data.articleId}
          articleUrl={rowData.data.articleUrl}
          onCommentGuidelinesPress={onCommentGuidelinesPress}
          onCommentsPress={onCommentsPress}
          onRelatedArticlePress={onRelatedArticlePress}
          onTopicPress={onTopicPress}
        />
      );
    }
  }
};

const renderText = (block, inlined = false) => {
  const { lineHeight } = block;
  if (!inlined) {
    return block.getComponent(style => (
      <View>
        <Text selectable style={style}>
          {block.idealSpans.map(span => {
            if (span.href) {
              return span.href(span);
            }
            return (
              <Text
                selectable
                style={{
                  ...convertStyles(span.style),
                  lineHeight,
                  color: colours.functional.black
                }}
              >
                {span.text}
              </Text>
            );
          })}
        </Text>
      </View>
    ));
  }
  return block.getComponent(style => (
    <View style={{ height: block.measuredHeight }}>
      {block.block.children.map(line =>
        line.idealSpans.map(span => {
          if (span.href) {
            return (
              <Text
                selectable
                style={{
                  ...style,
                  left: span.x,
                  position: "absolute",
                  top: span.y
                }}
              >
                {span.href(span)}
              </Text>
            );
          }
          return (
            <Text
              selectable
              numberOfLines={1}
              ellipsizeMode="clip"
              style={{
                left: span.x,
                ...style,
                ...convertStyles(span.style),
                lineHeight,
                position: "absolute",
                top: span.y,
                color: colours.functional.black
              }}
            >
              {span.text}
            </Text>
          );
        })
      )}
    </View>
  ));
};

const renderInlineBlock = block => (
  <ResponsiveContext.Consumer>
    {() => {
      const textLeftPadding = 5;
      const gutterWidth = Math.min(screenWidth(), tabletWidthMax);
      const textContainerWidth = Math.min(screenWidth(), tabletWidth);
      const style = {
        height: block.height,
        left: (gutterWidth - textContainerWidth) / 2 + textLeftPadding,
        position: "absolute",
        top: 0,
        width: Math.min(maxWidth, screenWidth()) * 0.35,
        zIndex: 1
      };
      return (
        <Fragment>
          <View style={style}>{block.getComponent()}</View>
          {block.children.map(subBlock => renderText(subBlock, true))}
        </Fragment>
      );
    }}
  </ResponsiveContext.Consumer>
);

class ArticleSkeleton extends PureComponent {
  constructor(props) {
    super(props);
    this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this);
  }

  onViewableItemsChanged(info) {
    if (!info.changed.length) return [];

    const { onViewed, data } = this.props;

    return info.changed
      .filter(viewableItem => viewableItem.isViewable)
      .map(viewableItem => onViewed(viewableItem.item, data));
  }

  rebuildRows = textFlow =>
    textFlow.block.children.map((block, i) => {
      let data;
      if (block instanceof Layout.Block) {
        data = block.getComponent();
      }
      if (block instanceof Layout.InlineBlock) {
        data = renderInlineBlock(block);
      }
      if (block instanceof FText.Text) {
        data = renderText(block);
      }
      return {
        data,
        index: i,
        type: "articleBodyRow"
      };
    });

  updateData = memoize(dataSource => {
    if (!dataSource || !dataSource.content || !dataSource.content.length) {
      return [];
    }

    const { dropcapsDisabled, template } = dataSource;

    let newContent = [...dataSource.content];
    if (newContent && newContent.length > 0) {
      newContent = insertDropcapIntoAST(newContent, template, dropcapsDisabled);
    }

    const articleOrganised = listViewDataHelper({
      ...dataSource,
      content: newContent
    });
    const articleData = articleOrganised.map((item, index) => ({
      ...item,
      elementId: `${item.type}.${index}`,
      name: item.type
    }));

    const rows = articleData
      .filter(row => row.type === "articleBodyRow")
      .map(({ data }) => data);

    if (!rows.length) {
      return [];
    }

    const others = articleData.filter(row => row.type !== "articleBodyRow");

    return this.layoutIfNeeded(rows, articleData, others);
  });

  layoutIfNeeded(rows, articleData, others) {
    const {
      interactiveConfig,
      onImagePress,
      onLinkPress,
      onTwitterLinkPress,
      onVideoPress,
      receiveChildList,
      isTablet,
      dropCapFont,
      scale
    } = this.props;
    const { fontScale } = Dimensions.get("window");

    const textFlow = new Layout.TextFlow({
      padding: 20,
      flow: rows.map(rowData =>
        ArticleRowFlow({
          content: rowData,
          fontScale,
          interactiveConfig,
          isTablet,
          onImagePress,
          onLinkPress,
          onTwitterLinkPress,
          onVideoPress,
          dropCapFont,
          scale,
          width: Math.min(maxWidth, screenWidth())
        })
      ),
      width: Math.min(tabletWidth, screenWidth())
    });

    receiveChildList(articleData);

    return [...this.rebuildRows(textFlow), ...others];
  }

  render() {
    const {
      adConfig,
      analyticsStream,
      Header,
      interactiveConfig,
      onCommentGuidelinesPress,
      onCommentsPress,
      onRelatedArticlePress,
      onTopicPress,
      onViewed,
      data
    } = this.props;
    const content = this.updateData(data);
    if (!content.length) {
      return null;
    }

    return (
      <AdComposer adConfig={adConfig}>
        <View style={styles.articleContainer}>
          <Viewport.Tracker>
            <FlatList
              data={content && content.length ? content : []}
              initialListSize={listViewSize}
              removeClippedSubviews
              interactiveConfig={interactiveConfig}
              keyExtractor={item =>
                item.index ? `${item.type}.${item.index}` : item.type
              }
              ListHeaderComponent={
                <Gutter>
                  <Header width={Math.min(maxWidth, screenWidth())} />
                </Gutter>
              }
              nestedScrollEnabled
              onViewableItemsChanged={
                onViewed ? this.onViewableItemsChanged : null
              }
              pageSize={listViewPageSize}
              renderItem={({ item }) => (
                <Gutter>
                  {renderRow(
                    item,
                    onCommentsPress,
                    onCommentGuidelinesPress,
                    onRelatedArticlePress,
                    onTopicPress,
                    analyticsStream
                  )}
                </Gutter>
              )}
              scrollRenderAheadDistance={listViewScrollRenderAheadDistance}
              testID="flat-list-article"
              viewabilityConfig={viewabilityConfig}
            />
          </Viewport.Tracker>
        </View>
      </AdComposer>
    );
  }
}

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
