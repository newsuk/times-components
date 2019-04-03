/* eslint-disable consistent-return */

import React, { Component } from "react";
import { View, FlatList, ScrollView, Text } from "react-native";
import PropTypes from "prop-types";
import { AdComposer } from "@times-components/ad";
import Responsive from "@times-components/responsive";
import { withTrackScrollDepth } from "@times-components/tracking";
import { screenWidth } from "@times-components/utils";
import ArticleExtras from "@times-components/article-extras";
import { ArticleRowFlow } from "./article-body/article-body-row";
import ArticleTopics from "./article-topics";
import {
  articleSkeletonPropTypes,
  articleSkeletonDefaultProps
} from "./article-skeleton-prop-types";
import listViewDataHelper from "./data-helper";
import articleTrackingContext from "./article-tracking-context";
import insertDropcapIntoAST from "./dropcap-util";
import styles from "./styles/shared";
import Gutter, { maxWidth } from "./gutter";
import { Layout, Text as FText } from "@times-components/text-flow";

const listViewPageSize = 1;
const listViewSize = 10;
const listViewScrollRenderAheadDistance = 10;

const viewabilityConfig = {
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: false
};

const renderRow = (
  rowData,
  onCommentsPress,
  onCommentGuidelinesPress,
  onRelatedArticlePress,
  onTopicPress,
  analyticsStream,
) => {
  // eslint-disable-next-line default-case
  switch (rowData.type) {
    case "articleBodyRow": {
      return rowData.data
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

class ArticleSkeleton extends Component {
  constructor(props) {
    super(props);
    this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this);

    if (props.data) {
      this.state = {
        dataSource: props.data,
        width: screenWidth(),
        content: null
      };
    } else {
      this.state = {
        dataSource: {}
      };
    }
  }

  componentWillMount() {
    this.layout()
  }

  onViewableItemsChanged(info) {
    if (!info.changed.length) return [];

    const { onViewed } = this.props;
    const { dataSource } = this.state;

    return info.changed
      .filter(viewableItem => viewableItem.isViewable)
      .map(viewableItem => onViewed(viewableItem.item, dataSource));
  }

  rebuildRows(textFlow) {
    return textFlow.block.children.map(block => {
      let data;
      if (block instanceof Layout.Block) {
        data = this.renderBlock(block)
      }
      if (block instanceof Layout.InlineBlock) {
        data = this.renderInlineBlock(block)
      }
      if (block instanceof FText.Text) {
        data = this.renderText(block)
      }
      return {
        type: 'articleBodyRow',
        data
      }
    })
  }

  layout() {
    const {
      interactiveConfig,
      onCommentGuidelinesPress,
      onLinkPress,
      onTwitterLinkPress,
      onVideoPress,
      receiveChildList
    } = this.props;
    const { dataSource, width } = this.state;
    const { dropcapsDisabled, template } = dataSource;
    if (!dataSource.content) {
      return null;
    }

    let newContent = [...dataSource.content]
    if (newContent && newContent.length > 0) {
      newContent = insertDropcapIntoAST(
        newContent,
        template,
        dropcapsDisabled
      );
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

    const others = articleData
      .filter(row => row.type !== 'articleBodyRow')

    if (this.state.flow) {
      this.state.flow.layout()
      this.setState({
        content: [
          ...this.rebuildRows(this.state.flow),
          ...others
        ]
      })
      return
    }

    const textFlow = new Layout.TextFlow({
      width: 660,
      flow: rows.map(rowData => {
        return (
          ArticleRowFlow({
            content: rowData,
            interactiveConfig,
            onLinkPress,
            onTwitterLinkPress,
            onVideoPress,
            width: Math.min(maxWidth, width)
          })
        );
      })
    })

    receiveChildList(articleData);

    this.setState({
      flow: textFlow,
      content: [
        ...this.rebuildRows(textFlow),
        ...others
      ]
    })
  }

  renderInlineBlock(block) {
    const { width } = this.state;
    return (<View>
      <View onLayout={e => {
        if (block.prevHeight !== block.height) {
          this.layout()
        }
        block.prevHeight = block.height
      }} style={{
        position: 'absolute',
        top: 0,
        left: block.x + 60,
        width: Math.min(maxWidth, width) * 0.35,
        height: block.height,
        zIndex: 1,
      }}>
        {block.getComponent()}
      </View>
      {block.children.map(subBlock => this.renderText(subBlock))}
    </View>)
  }

  renderBlock(block) {
    return block.getComponent()
  }

  renderText(block) {
    return block.getComponent(style => <View style={{ height: block.measuredHeight }}>
      {
        block.block.children.map(line =>
          line.idealSpans.map(span => (
            <Text
              selectable
              style={{
                ...style,
                fontFamily: span.style.font,
                fontWeight: span.style.font.includes('Bold') ? 'bold' : null,
                fontStyle: span.style.font.includes('Italic') ? 'italic' : null,
                position: 'absolute',
                top: span.y,
                left: span.x
              }}
            >
              {span.text}
            </Text>))
        )
      }
    </View>
    )
  }

  render() {
    const {
      adConfig,
      analyticsStream,
      Header,
      interactiveConfig,
      onAuthorPress,
      onCommentGuidelinesPress,
      onCommentsPress,
      onLinkPress,
      onRelatedArticlePress,
      onTopicPress,
      onTwitterLinkPress,
      onViewed,
      onVideoPress
    } = this.props;
    const { width } = this.state;
    if (!this.state.content) {
      return null
    }

    return (<AdComposer adConfig={adConfig}>
      <Responsive>
        <View style={styles.articleContainer}>
          <FlatList
            data={this.state.content}
            initialListSize={listViewSize}
            interactiveConfig={interactiveConfig}
            keyExtractor={item =>
              item.index ? `${item.type}.${item.index}` : item.type
            }
            ListHeaderComponent={
              <Gutter>
                <Header width={Math.min(maxWidth, width)} />
              </Gutter>
            }
            onViewableItemsChanged={
              onViewed ? this.onViewableItemsChanged : null
            }
            pageSize={listViewPageSize}
            renderItem={({ item }) => (
              <Gutter>
                {renderRow(
                  item,
                  onAuthorPress,
                  onCommentsPress,
                  onCommentGuidelinesPress,
                  onLinkPress,
                  onRelatedArticlePress,
                  onTopicPress,
                  onTwitterLinkPress,
                  onVideoPress,
                  analyticsStream,
                  interactiveConfig
                )}
              </Gutter>
            )}
            scrollRenderAheadDistance={listViewScrollRenderAheadDistance}
            testID="flat-list-article"
            viewabilityConfig={viewabilityConfig}
          />
        </View>
      </Responsive>
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
