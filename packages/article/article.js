import React from "react";
import {
  Text,
  View,
  ListView,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import PropTypes from "prop-types";
import { renderTrees } from "@times-components/markup";
import Image from "@times-components/image";
import pick from "lodash.pick";
import get from "lodash.get";

import styles from "./article-style";
import ArticleHeader from "./article-header";
import ArticleMeta from "./article-meta";

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
const pageSize = 1;
const listViewSize = 10;
const scrollRenderAheadDistance = 10;

class ArticlePage extends React.Component {
  static prepareDataForListView(props) {
    const articleData = props.data.article;
    const leadAssetData = pick(articleData, ["leadAsset"]);
    const articleHeaderData = pick(articleData, [
      "id",
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
    const ArticleArray = Array.prototype.concat(
      [
        { type: "leadAsset", data: leadAssetData },
        { type: "header", data: articleHeaderData },
        { type: "middleContainer", data: articleMidContainerData }
      ],
      // NOTE failing gracefully
      get(articleData, "content", []).map(i => ({
        type: "article_body_row",
        data: i
      }))
    );
    return ArticleArray;
  }

  static renderRow(rowData) {
    if (rowData.type === "leadAsset") {
      return (
        <View style={styles.LeadAsset}>
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
        <View style={[styles.ArticleMainContentRow]}>
          {renderTrees([rowData.data], {
            paragraph(key, attributes, children) {
              return (
                <Text
                  key={key}
                  style={StyleSheet.flatten([styles.ArticleTextElement])}
                >
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
        <View style={styles.Container}>
          <ActivityIndicator size={"large"} />
        </View>
      );
    }

    return (
      <View style={styles.PageWrapper}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={ArticlePage.renderRow}
          initialListSize={listViewSize}
          scrollRenderAheadDistance={scrollRenderAheadDistance}
          pageSize={pageSize}
        />
      </View>
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
    loading: true
  }
};

export default ArticlePage;
