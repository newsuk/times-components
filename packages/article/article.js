import React from "react";
import { Text, View, ListView, Platform, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Ad, { AdComposer } from "@times-components/ad"; // , { AdComposer }
import {
  NewArticleFlag,
  SponsoredArticleFlag,
  UpdatedArticleFlag,
  ExclusiveArticleFlag
} from "@times-components/article-flag";
import ArticleLabel from "@times-components/article-label";
import ArticleHeadline from "@times-components/article-headline";
import DatePublication from "@times-components/date-publication";
import Image from "@times-components/image";
import Caption from "@times-components/caption";
import { builder } from "@times-components/markup";
import ArticleByline from "@times-components/article-byline";
import pick from "lodash.pick";
import get from "lodash.get";

import styles from "./article-style";

// const multiParagraph = require("./fixtures/multi-para.json").fixture;

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class ArticlePage extends React.Component {
  static prepareDataForListView(props) {
    const articleData = props.data.article;
    const adsData = { code: "intervention", section: "article" };
    const leadAssetData = pick(articleData, ["leadAsset"]);
    const articleHeaderData = pick(articleData, [
      "id",
      "label",
      "title"
      // NOTE flags and standfirst fields are missed from the api
    ]);

    // HACK for the flags and standfirst
    Object.assign(articleHeaderData, {
      standfirst: "Cras mattis consectetur purus sit amet fermentum",
      newFlag: true,
      sponsoredFlag: true,
      updatedFlag: true,
      exclusiveFlag: true
    });

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
        { type: "middleContaner", data: articleMidContainerData }
      ],
      // NOTE failing gracefully
      get(articleData, "content", []).map(i => ({
        type: "article_body_row",
        data: i
      }))
      // multiParagraph.map(i => ({ type: "article_body_row", data: i }))
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
      const TEMP_HTTPS_IMAGE_URL =
        "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F26cb2178-868c-11e7-9f10-c918952dd8f2.jpg?crop=1322%2C743%2C260%2C319&resize=685"; // eslint-disable-line
      return (
        <View style={styles.LeadAsset}>
          <Image source={{ uri: TEMP_HTTPS_IMAGE_URL }} />
          {Platform.OS === "web" && rowData.data.leadAsset.caption
            ? <View style={styles.CaptionWrapper}>
                <Caption
                  text={rowData.data.leadAsset.caption}
                  credits={rowData.data.leadAsset.credits}
                />
              </View>
            : null}
        </View>
      );
    } else if (rowData.type === "header") {
      return (
        <View style={[styles.ArticleMainContentRow]}>
          {rowData.data.label
            ? <View style={styles.ArticleLabel}>
                <ArticleLabel title={rowData.data.label} color="#008347" />
              </View>
            : null}
          <View style={styles.ArticleHeadline}>
            <ArticleHeadline
              title={rowData.data.title}
              style={styles.ArticleHeadLineText}
            />
          </View>
          <Text style={styles.StandFirst}>
            {rowData.data.standfirst}
          </Text>
          <View style={styles.ArticleFlag}>
            {rowData.data.newFlag
              ? <View style={styles.ArticleFlagContainer}>
                  <NewArticleFlag />
                </View>
              : null}
            {rowData.data.updatedFlag
              ? <View style={styles.ArticleFlagContainer}>
                  <UpdatedArticleFlag />
                </View>
              : null}
            {rowData.data.exclusiveFlag
              ? <View style={styles.ArticleFlagContainer}>
                  <ExclusiveArticleFlag />
                </View>
              : null}
            {rowData.data.sponsoredFlag
              ? <View style={styles.ArticleFlagContainer}>
                  <SponsoredArticleFlag />
                </View>
              : null}
          </View>
        </View>
      );
    } else if (rowData.type === "middleContaner") {
      return (
        <View
          style={[styles.ArticleMainContentRow, styles.ArticleMiddleContainer]}
        >
          <View style={styles.ArticleMeta}>
            <View style={[styles.ArticleMetaElement]}>
              <ArticleByline ast={rowData.data.byline} />
            </View>
            <View style={[styles.ArticleMetaElement]}>
              <DatePublication
                date={new Date(rowData.data.publishedTime)}
                publication={rowData.data.publicationName}
              />
            </View>
          </View>
        </View>
      );
    } else if (rowData.type === "article_body_row") {
      return (
        <View
          className="markup-wrapper-outer"
          style={[styles.ArticleMainContentRow, styles.ArticleText]}
        >
          {builder({ ast: [rowData.data] }).map(el =>
            <View
              className="markup-wrapper"
              style={styles.ArticleTextWrapper}
              key={`paragraph-${Date.now().toLocaleString()}`}
            >
              {React.cloneElement(el, {
                className: "single-element",
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
      return <Text>Loading ....</Text>;
    }

    this.state = {
      dataSource: ds.cloneWithRows(
        ArticlePage.prepareDataForListView(this.props)
      )
    };
    return (
      <View style={styles.PageWrapper}>
        <View
          className="navigation"
          style={{ height: 66, backgroundColor: "#003d58" }}
        >
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
