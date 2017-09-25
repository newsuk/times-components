import React from "react";
import { Text, View, ListView, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { renderTrees } from "@times-components/markup";
import Image from "@times-components/image";

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

class ArticlePage extends React.Component {
  static renderRow(rowData) {
    if (rowData.type === "leadAsset") {
      return (
        <View style={styles.leadAsset}>
          <Image source={{ uri: rowData.data.leadAsset.crop.url }} />
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
    } else if (rowData.type === "article_body_row") {
      return (
        <View style={[styles.articleMainContentRow]}>
          {renderTrees([rowData.data], {
            paragraph(key, attributes, children) {
              return (
                <Text key={key} style={styles.articleTextElement}>
                  {children}
                </Text>
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
    this.state = {
      dataSource: ds.cloneWithRows({})
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading) {
      this.setState({
        dataSource: ds.cloneWithRows(listViewDataHelper(nextProps.data.article))
      });
    }
  }

  render() {
    if (this.props.data.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size={"large"} />
        </View>
      );
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={ArticlePage.renderRow}
        initialListSize={listViewSize}
        scrollRenderAheadDistance={listViewScrollRenderAheadDistance}
        pageSize={listViewPageSize}
        enableEmptySections
      />
    );
  }
}

ArticlePage.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.boolean,
    article: PropTypes.shape({
      ...articleHeaderPropTypes,
      ...articleMetaPropTypes
    })
  })
};

ArticlePage.defaultProps = {
  data: {
    loading: true,
    article: {
      ...articleHeaderDefaultPropTypes,
      ...articleMetaDefaultPropTypes
    }
  }
};

export default ArticlePage;
