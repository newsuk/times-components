import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Image from "@times-components/image";

import ArticleContent from "./article-content";
import ArticleError from "./article-error";
import ArticleLoading from "./article-loading";

import listViewDataHelper from "./data-helper";
import styles from "./styles/article-body";
import ArticleHeader from "./article-header/article-header";
import ArticleMeta from "./article-meta/article-meta";
import ArticleRow from "./article-body/article-body-row";

import articleTrackingContext from "./article-tracking-context";

const listViewPageSize = 1;
const listViewSize = 10;
const listViewScrollRenderAheadDistance = 10;

class ArticlePage extends React.Component {
  static renderRow(rowData) {
    if (rowData.type === "leadAsset") {
      const [ratioWidth, ratioHeight] = rowData.data.crop.ratio.split(":");
      const aspectRatio = ratioWidth / ratioHeight;
      return (
        <View testID="leadAsset" key={rowData.type} style={styles.leadAsset}>
          <Image uri={rowData.data.crop.url} aspectRatio={aspectRatio} />
        </View>
      );
    } else if (rowData.type === "header") {
      const { headline, flags, standfirst, label } = rowData.data;
      return (
        <ArticleHeader
          key={rowData.type}
          headline={headline}
          flags={flags}
          standfirst={standfirst}
          label={label}
          style={[styles.articleMainContentRow]}
        />
      );
    } else if (rowData.type === "middleContainer") {
      const { byline, publishedTime, publicationName } = rowData.data;
      return (
        <ArticleMeta
          key={rowData.type}
          byline={byline}
          publishedTime={publishedTime}
          publicationName={publicationName}
        />
      );
    } else if (rowData.type === "articleBodyRow") {
      return <ArticleRow content={rowData} />;
    }

    return null;
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
        scrollRenderAheadDistance={listViewScrollRenderAheadDistance}
        pageSize={listViewPageSize}
      />
    );

    return ArticleListView;
  }
}

ArticlePage.propTypes = {
  article: PropTypes.shape({
    ...ArticleHeader.propTypes,
    ...ArticleMeta.propTypes
  }),
  isLoading: PropTypes.bool,
  error: PropTypes.shape({
    graphQLErrors: PropTypes.array,
    networkError: PropTypes.shape({
      message: PropTypes.string
    }),
    message: PropTypes.string
  })
};

ArticlePage.defaultProps = {
  article: null,
  isLoading: false,
  error: null
};

export default articleTrackingContext(ArticlePage);
