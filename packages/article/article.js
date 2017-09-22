import React from "react";
import { Text, View, ListView, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { renderTrees } from "@times-components/markup";
import Image from "@times-components/image";
import pick from "lodash.pick";

import styles from "./article-style";
import ArticleHeader from "./article-header";
import ArticleMeta from "./article-meta";

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
const listViewPageSize = 1;
const listViewSize = 10;
const listViewScrollRenderAheadDistance = 10;

class ArticlePage extends React.Component {
  static prepareDataForListView(props) {
    const articleData = props.data.article;
    const leadAssetData = pick(articleData, ["leadAsset"]);
    const articleHeaderData = pick(articleData, [
      "label",
      "title",
      "standfirst",
      "flags"
    ]);

    const articleMidContainerData = pick(articleData, [
      "publicationName",
      "publishedTime",
      "byline"
    ]);
    return Array.prototype.concat(
      [
        { type: "leadAsset", data: leadAssetData },
        { type: "header", data: articleHeaderData },
        { type: "middleContainer", data: articleMidContainerData }
      ],
      articleData.content.map(i => ({
        type: "article_body_row",
        data: i
      }))
    );
  }

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
        dataSource: ds.cloneWithRows(
          ArticlePage.prepareDataForListView(nextProps)
        )
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
      />
    );
  }
}

ArticlePage.propTypes = {
  data: PropTypes.shape({
    article: PropTypes.object,
    loading: PropTypes.boolean
  })
};

ArticlePage.defaultProps = {
  data: {
    loading: true,
    article: {}
  }
};

export default ArticlePage;
