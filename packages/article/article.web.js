import React from "react";
import { Platform, Text, View, ListView } from "react-native";
import PropTypes from "prop-types";
import get from "lodash.get";
import { renderTrees } from "@times-components/markup";
import Image from "@times-components/image";
import ArticleImage from "@times-components/article-image";
import { AdComposer } from "@times-components/ad";
import { withTrackingContext } from "@times-components/tracking";

import ArticleError from "./article-error";
import ArticleLoading from "./article-loading";

import listViewDataHelper from "./data-helper";
import styles, {
  ResponsiveWrapper,
  PrimaryContainer,
  SecondaryContainer,
  InlineContainer,
  LeadAsset
} from "./styles/body";
import ArticleHeader from "./article-header.web";
import ArticleMeta from "./article-meta.web";

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
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
        <LeadAsset testID="leadAsset">
          <Image uri={rowData.data.crop.url} aspectRatio={16 / 9} />
        </LeadAsset>
      );
    } else if (rowData.type === "header") {
      const { headline, flags, standfirst, label } = rowData.data;
      return (
        <ResponsiveWrapper>
          <ArticleHeader
            headline={headline}
            flags={flags}
            standfirst={standfirst}
            label={label}
          />
        </ResponsiveWrapper>
      );
    } else if (rowData.type === "middleContainer") {
      const { byline, publishedTime, publicationName } = rowData.data;
      return (
        <ResponsiveWrapper>
          <ArticleMeta
            byline={byline}
            publishedTime={publishedTime}
            publicationName={publicationName}
          />
        </ResponsiveWrapper>
      );
    } else if (rowData.type === "articleBodyRow") {
      return (
        <View>
          {renderTrees([rowData.data], {
            paragraph(key, attributes, children) {
              return (
                <ResponsiveWrapper>
                  <Text
                    testID={`paragraph-${rowData.index}`}
                    style={styles.articleTextElement}
                  >
                    {children}
                  </Text>
                </ResponsiveWrapper>
              );
            },
            image(key, attributes) {
              const ImageContainer = ArticlePage.imageContainerChooser(
                attributes.display
              );
              return (
                <ImageContainer key={key}>
                  <ArticleImage
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
                </ImageContainer>
              );
            }
          })}
        </View>
      );
    }

    return null;
  }

  static imageContainerChooser(imageType) {
    switch (imageType) {
      case "primary":
        return PrimaryContainer;
      case "secondary":
        return SecondaryContainer;
      case "inline":
        return InlineContainer;
      default:
        return null;
    }
  }

  constructor(props) {
    super(props);

    if (props.article && !props.isLoading && !props.error) {
      this.state = {
        dataSource: ds.cloneWithRows(listViewDataHelper(props.article))
      };
    } else {
      this.state = {
        dataSource: ds.cloneWithRows({})
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading && !nextProps.error) {
      this.setState({
        dataSource: ds.cloneWithRows(listViewDataHelper(nextProps.article))
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
      <ListView
        testID="listView"
        dataSource={this.state.dataSource}
        renderRow={ArticlePage.renderRow}
        initialListSize={listViewSize}
        scrollRenderAheadDistance={listViewScrollRenderAheadDistance}
        pageSize={listViewPageSize}
        enableEmptySections
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
