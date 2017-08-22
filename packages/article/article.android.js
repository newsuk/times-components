import React from "react";
import { Text, View, ListView } from "react-native";
import PropTypes from "prop-types";
import Ad from "@times-components/ad"; // , { AdComposer }
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
import Markup from "@times-components/markup";
import ArticleByline from "@times-components/article-byline";
import pick from "lodash.pick";

import styles from "./article-style";

const multiParagraph = require("./fixtures/multi-para.json").fixture;
const authorFixture = require("./fixtures/author.json").singleTextAuthor;

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class ArticlePage extends React.Component {
  // constructor (props) {
  //   super(props);
  //  }

  static prepareDataForListView(props) {
    const Article = props.data.article;
    const AdsData = { code: "intervention", section: "article" };
    const ArticleHeader = pick(Article, [
      "id",
      "title",
      "publicationName",
      "label"
      // NOTE flag fields are missed from the api
      // ...
    ]);
    // HACK for the flags
    Object.assign(ArticleHeader, { newFlag: true, sponsoredFlag: true });

    const ArticleMidContainer = pick(Article, [
      "publicationName",
      "publishedTime",
      "leadAsset"
      // NOTE byline field is missed from the api
      // byline
    ]);
    // HACK for the byline
    Object.assign(ArticleMidContainer, {
      byline: authorFixture
    });
    const ArticleArray = Array.prototype.concat(
      [
        { type: "ads", data: AdsData },
        { type: "header", data: ArticleHeader },
        { type: "middleContaner", data: ArticleMidContainer }
      ],
      multiParagraph.map(i => ({ type: "article_body_row", data: i }))
    );
    return ArticleArray;
  }

  static renderRow(rowData) {
    if (rowData.type === "ads") {
      return (
        <View style={styles.ArticleAd}>
          <Ad code={rowData.data.code} section={rowData.data.section} />
        </View>
      );
    }
    if (rowData.type === "header") {
      return (
        <View style={[styles.ArticleBodyContainer, styles.ArticleHeader]}>
          {rowData.data.label
            ? <ArticleLabel title={rowData.data.label} color="#008347" />
            : null}
          <View style={styles.ArticleHeadline}>
            <ArticleHeadline
              title={rowData.data.title}
              style={styles.ArticleHeadLineText}
            />
          </View>
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
      // HACK
      const TEMP_HTTPS_IMAGE_URL =
        "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F26cb2178-868c-11e7-9f10-c918952dd8f2.jpg?crop=1322%2C743%2C260%2C319&resize=685"; // eslint-disable-line
      return (
        <View style={[styles.ArticleBodyContainer]}>
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
          <View style={styles.LeadAsset}>
            <View style={styles.ArticleMedia}>
              <Image source={{ uri: TEMP_HTTPS_IMAGE_URL }} />
            </View>
            <Caption
              text={rowData.data.leadAsset.caption}
              credits={rowData.data.leadAsset.credits}
            />
          </View>
        </View>
      );
    } else if (rowData.type === "article_body_row") {
      return (
        <View style={[styles.ArticleBodyContainer, styles.ArticleText]}>
          <Markup ast={[rowData.data]} />
        </View>
      );
    }

    return <Text> Unknown type </Text>;
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
      <View style={styles.PageStyle}>
        <View style={{ height: 50, backgroundColor: "yellow" }}>
          <Text>
            This is the header of the page
          </Text>
        </View>
        <ListView
          style={styles.ArticleContainer}
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
