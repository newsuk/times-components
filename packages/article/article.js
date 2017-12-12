import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import get from "lodash.get";
import { renderTrees } from "@times-components/markup";
import Image from "@times-components/image";
import ArticleImage from "@times-components/article-image";
import { withTrackingContext } from "@times-components/tracking";

import ArticleContent from "./article-content";
import ArticleError from "./article-error";
import ArticleLoading from "./article-loading";

import listViewDataHelper from "./data-helper";
import styles from "./styles/body";
import ArticleHeader from "./article-header";
import ArticleMeta from "./article-meta";

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
      return (
        <View key={rowData.type + rowData.index}>
          {renderTrees([rowData.data], {
            paragraph(key, attributes, children) {
              return (
                <View
                  testID={`paragraph-${rowData.index}`}
                  accessibilityLabel={`paragraph-${rowData.index}`}
                  key={key}
                  style={[styles.articleMainContentRow]}
                >
                  <Text style={styles.articleTextElement}>{children}</Text>
                </View>
              );
            },
            image(key, attributes) {
              return (
                <ArticleImage
                  key={key}
                  imageOptions={{
                    display: attributes.display,
                    ratio: attributes.ratio,
                    url: attributes.url
                  }}
                  captionOptions={{
                    caption: attributes.caption,
                    credits: attributes.credits
                  }}
                />
              );
            }
          })}
        </View>
      );
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

export default withTrackingContext(ArticlePage, {
  trackingObject: "Article",
  getAttrs: ({ article } = {}) => ({
    byline: get(article, "byline[0].children[0].attributes.value", ""),
    headline: get(article, "headline", ""),
    publishedTime: get(article, "publishedTime", "")
  })
});
