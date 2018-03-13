import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import { AdComposer } from "@times-components/ad";

import ArticleContent from "./article-content";
import ArticleError from "./article-error";
import ArticleLoading from "./article-loading";
import { articlePropTypes, articleDefaultProps } from "./article-proptype";

import listViewDataHelper from "./data-helper";
import styles from "./styles/article-body";
import ArticleHeader from "./article-header/article-header";
import ArticleMeta from "./article-meta/article-meta";
import ArticleRow from "./article-body/article-body-row";
import RelatedArticles from "./related-articles/related-articles";

import articleTrackingContext from "./article-tracking-context";

const listViewPageSize = 1;
const listViewSize = 10;
const listViewScrollRenderAheadDistance = 10;

class ArticlePage extends React.Component {
  static renderRow(rowData, onRelatedArticlePress) {
    switch (rowData.type) {
      case "leadAsset": {
        const [ratioWidth, ratioHeight] = rowData.data.crop.ratio.split(":");
        const aspectRatio = ratioWidth / ratioHeight;
        return (
          <View testID="leadAsset" key={rowData.type} style={styles.leadAsset}>
            <Image uri={rowData.data.crop.url} aspectRatio={aspectRatio} />
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
          />
        );
      }

      case "articleBodyRow": {
        return <ArticleRow content={rowData} />;
      }

      case "relatedArticles": {
        const { relatedArticles, relatedArticlesLayout } = rowData.data;
        return (
          <RelatedArticles
            analyticsStream={() => {}}
            articles={relatedArticles}
            template={relatedArticlesLayout.template}
            onPress={onRelatedArticlePress}
          />
        );
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
  isLoading: PropTypes.bool,
  error: PropTypes.shape({
    graphQLErrors: PropTypes.array,
    networkError: PropTypes.shape({
      message: PropTypes.string
    }),
    message: PropTypes.string
  }),
  adConfig: PropTypes.shape({}).isRequired,
  onRelatedArticlePress: PropTypes.func
};

ArticlePage.defaultProps = {
  ...articleDefaultProps,
  isLoading: false,
  error: null,
  onRelatedArticlePress: () => {}
};

export default articleTrackingContext(ArticlePage);
