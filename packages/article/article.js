import React from "react";
import { Platform, Text, View } from "react-native";
import PropTypes from "prop-types";
import get from "lodash.get";
import { renderTrees } from "@times-components/markup";
import Image from "@times-components/image";
import ArticleImage from "@times-components/article-image";
import { AdComposer } from "@times-components/ad";
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

const withAdComposer = (children, section = "article") => (
  <AdComposer section={section}>{children}</AdComposer>
);

class ArticlePage extends React.Component {
  static renderRow(rowData) {
    if (rowData.type === "leadAsset") {
      return (
        <View testID="leadAsset" style={styles.leadAsset}>
          <Image uri={rowData.data.crop.url} aspectRatio={16 / 9} />
        </View>
      );
    } else if (rowData.type === "header") {
      const { headline, flags, standfirst, label } = rowData.data;
      return (
        <ArticleHeader
          headline={headline}
          flags={flags}
          standfirst={standfirst}
          label={label}
        />
      );
    } else if (rowData.type === "middleContainer") {
      const { byline, publishedTime, publicationName } = rowData.data;
      return (
        <ArticleMeta
          byline={byline}
          publishedTime={publishedTime}
          publicationName={publicationName}
        />
      );
    } else if (rowData.type === "articleBodyRow") {
      return (
        <View>
          {renderTrees([rowData.data], {
            paragraph(key, attributes, children) {
              return (
                <View
                  testID={`paragraph-${rowData.index}`}
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

    return Platform.OS === "web"
      ? withAdComposer(ArticleListView)
      : ArticleListView;
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
