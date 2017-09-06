import React from "react";
import {
  Text,
  View,
  ListView,
  Platform,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import PropTypes from "prop-types";
import Ad, { AdComposer } from "@times-components/ad";
import { builder } from "@times-components/markup";
import Image from "@times-components/image";
import pick from "lodash.pick";
import get from "lodash.get";

import styles from "./article-style";
import ArticleHeader from "./article-header";
import ArticleMeta from "./article-meta";

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class ArticlePage extends React.Component {
  static prepareDataForListView(props) {
    const articleData = props.data.article;
    const adsData = { code: "intervention", section: "article" };
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
        { type: "ads", data: adsData },
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
    if (rowData.type === "ads" && Platform.OS === "web") {
      return (
        <View style={styles.ArticleAd}>
          <AdComposer section="article" networkId="25436805">
            <Ad code={rowData.data.code} section={rowData.data.section} />
          </AdComposer>
        </View>
      );
    } else if (rowData.type === "leadAsset") {
      // HACK at the moment graphql just support http image (we need https for the mobile)
      // rowData.data.crop.url =  // eslint-disable-line
      const TEMP_IMAGE_HTTP =
        "//www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F26cb2178-868c-11e7-9f10-c918952dd8f2.jpg?crop=1322%2C743%2C260%2C319&resize=685";
      return (
        <View style={styles.LeadAsset}>
          <Image source={{ uri: `https:${TEMP_IMAGE_HTTP}` }} />
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
        <View style={[styles.ArticleMainContentRow, styles.ArticleText]}>
          {builder({ ast: [rowData.data] }).map(el =>
            <View
              style={styles.ArticleTextWrapper}
              key={`paragraph-${Date.now().toLocaleString()}`}
            >
              {React.cloneElement(el, {
                style: StyleSheet.flatten([styles.ArticleTextElement])
              })}
            </View>
          )}
        </View>
      );
    }

    return null;
  }

  render() {
    if (this.props.data.loading) {
      return (
        <View style={styles.Container}>
          <ActivityIndicator size={"large"} />
        </View>
      );
    }

    this.state = {
      dataSource: ds.cloneWithRows(
        ArticlePage.prepareDataForListView(this.props)
      )
    };
    return (
      <View style={styles.PageWrapper}>
        <View style={{ height: 66, backgroundColor: "#003d58" }}>
          <Text
            style={{
              fontFamily: "TimesModern-Bold",
              fontSize: 20,
              fontWeight: "bold",
              color: "#fff",
              textAlign: "center",
              paddingTop: 31
            }}
          >
            News
          </Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={ArticlePage.renderRow}
          initialListSize={10}
          scrollRenderAheadDistance={10}
          pageSize={1}
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
