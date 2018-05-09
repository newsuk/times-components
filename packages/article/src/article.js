import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { AdComposer } from "@times-components/ad";
import RelatedArticles from "@times-components/related-articles";
import ArticleRow from "./article-body/article-body-row";
import ArticleHeader from "./article-header/article-header";
import ArticleLeadAsset from "./article-lead-asset/article-lead-asset";
import ArticleMeta from "./article-meta/article-meta";
import ArticleTopics from "./article-topics";
import ArticleContent from "./article-content";
import ArticleError from "./article-error";
import ArticleLoading from "./article-loading";
import styles from "./styles/article-body";
import { articlePropTypes, articleDefaultProps } from "./article-prop-types";
import articleTrackingContext from "./article-tracking-context";
import listViewDataHelper from "./data-helper";

const listViewPageSize = 1;
const listViewSize = 10;
const listViewScrollRenderAheadDistance = 10;

class ArticlePage extends Component {
  static renderRow(
    rowData,
    onRelatedArticlePress,
    onAuthorPress,
    onVideoPress,
    onLinkPress
  ) {
    switch (rowData.type) {
      case "leadAsset": {
        return (
          <View testID="leadAsset" key="leadAsset">
            <ArticleLeadAsset
              key={rowData.type}
              data={{ ...rowData.data, onVideoPress }}
            />
          </View>
        );
      }

      case "header": {
        const { headline, flags, standfirst, label, isVideo } = rowData.data;
        return (
          <ArticleHeader
            key={rowData.type}
            headline={headline}
            flags={flags}
            standfirst={standfirst}
            label={label}
            isVideo={isVideo}
            style={[styles.articleMainContentRow]}
          />
        );
      }

      case "middleContainer": {
        const { byline, publishedTime, publicationName } = rowData.data;
        return (
          <ArticleMeta
            key={rowData.type}
            byline={byline}
            publishedTime={publishedTime}
            publicationName={publicationName}
            onAuthorPress={onAuthorPress}
          />
        );
      }

      case "articleBodyRow": {
        return (
          <ArticleRow
            content={rowData}
            onLinkPress={onLinkPress}
            onVideoPress={onVideoPress}
          />
        );
      }

      case "relatedArticles": {
        const { relatedArticles, relatedArticlesLayout } = rowData.data;
        return (
          <RelatedArticles
            analyticsStream={() => {}}
            articles={relatedArticles}
            template={relatedArticlesLayout.template}
            onPress={onRelatedArticlePress}
            mainId={relatedArticlesLayout.main}
          />
        );
      }

      case "topics": {
        return <ArticleTopics topics={rowData.data.topics} />;
      }

      default: {
        return null;
      }
    }
  }

  constructor(props) {
    super(props);

    if (props.article && !props.isLoading && !props.error) {
      this.state = {
        dataSource: listViewDataHelper(props.article)
      };
    } else {
      this.state = {
        dataSource: {}
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading && !nextProps.error) {
      this.setState({
        dataSource: listViewDataHelper(nextProps.article)
      });
    }
  }

  render() {
    const { error, isLoading } = this.props;

    if (error) {
      return <ArticleError {...error} />;
    }

    if (isLoading) {
      return <ArticleLoading />;
    }
    const ArticleListView = (
      <ArticleContent
        data={this.state.dataSource}
        renderRow={ArticlePage.renderRow}
        initialListSize={listViewSize}
        onRelatedArticlePress={this.props.onRelatedArticlePress}
        onAuthorPress={this.props.onAuthorPress}
        onVideoPress={this.props.onVideoPress}
        onLinkPress={this.props.onLinkPress}
        scrollRenderAheadDistance={listViewScrollRenderAheadDistance}
        pageSize={listViewPageSize}
      />
    );

    return (
      <AdComposer adConfig={this.props.adConfig}>{ArticleListView}</AdComposer>
    );
  }
}

ArticlePage.propTypes = {
  ...articlePropTypes,
  onAuthorPress: PropTypes.func.isRequired,
  onVideoPress: PropTypes.func.isRequired,
  onLinkPress: PropTypes.func.isRequired
};
ArticlePage.defaultProps = articleDefaultProps;

export default articleTrackingContext(ArticlePage);
