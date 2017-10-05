import React from "react";
import {
  Platform,
  Text,
  View,
  ListView,
  ActivityIndicator
} from "react-native";
import PropTypes from "prop-types";
import { renderTrees } from "@times-components/markup";
import Image from "@times-components/image";
import ArticleImage from "@times-components/article-image";
import { AdComposer } from "@times-components/ad";

import listViewDataHelper from "./data-helper";
import styles from "./styles/article-style";
import ArticleHeader from "./article-header";
import ArticleMeta from "./article-meta";
import {
  articleHeaderPropTypes,
  articleHeaderDefaultPropTypes
} from "./article-header.proptypes";
import {
  articleMetaPropTypes,
  articleMetaDefaultPropTypes
} from "./article-meta.proptypes";

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
        <View style={styles.leadAsset}>
          <Image uri={rowData.data.crop.url} aspectRatio={16 / 9} />
        </View>
      );
    } else if (rowData.type === "header") {
      const { title, flags, standfirst, label } = rowData.data;
      return (
        <ArticleHeader
          title={title}
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
                <View key={key} style={[styles.articleMainContentRow]}>
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

    if (props.data.article) {
      this.state = {
        dataSource: ds.cloneWithRows(listViewDataHelper(props.data.article))
      };
    } else {
      this.state = {
        dataSource: ds.cloneWithRows({})
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading) {
      this.setState({
        dataSource: ds.cloneWithRows(listViewDataHelper(nextProps.data.article))
      });
    }
  }

  render() {
    if (this.props.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size={"large"} />
        </View>
      );
    }

    const ArticleListView = (
      <ListView
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
  data: PropTypes.shape({
    article: PropTypes.shape({
      ...articleHeaderPropTypes,
      ...articleMetaPropTypes
    })
  }),
  isLoading: PropTypes.bool
};

ArticlePage.defaultProps = {
  data: {
    article: {
      ...articleHeaderDefaultPropTypes,
      ...articleMetaDefaultPropTypes
    }
  },
  isLoading: true
};

export default ArticlePage;
