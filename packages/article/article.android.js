import React from "react";
import { Text, View, StyleSheet, ListView } from "react-native";
import PropTypes from "prop-types";
// import Ad, { AdComposer } from "@times-components/ad";
import { NewArticleFlag } from "@times-components/article-flag";
import ArticleLabel from "@times-components/article-label";
import ArticleHeadline from "@times-components/article-headline";
import DatePublication from "@times-components/date-publication";
import Image from "@times-components/image";
// import Caption from "@times-components/caption";
import Markup from "@times-components/markup";
import pick from "lodash.pick";

const multiParagraph = require("./fixtures/multi-para.json").fixture;

const styles = StyleSheet.create({
  Container: {},
  ArticleContainer: {
    flexDirection: "column",
    // boxSizing: "border-box",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15
  },
  LeadAsset: {
    position: "relative",
    // boxSizing: "border-box",
    marginBottom: 30
  },
  ArticleBody: {
    flexDirection: "row",
    width: "58.33%",
    marginTop: 30,
    alignSelf: "center",
    // marginRight: "auto",
    marginBottom: 0
    // marginLeft: "auto"
  },
  ArticleBodyChildContainer: {
    // boxSizing: "border-box"
  },
  ArticleHeader: {
    width: "58.33333%",
    alignSelf: "center"
    // margin: "auto"
  },
  ArticleHeadline: {},
  ArticleFlag: {
    marginTop: 6,
    marginBottom: 3
  },
  ArticleLabel: {},
  ArticleMeta: {
    flex: 1,
    width: "35.71429%",
    // boxSizing: "border-box",
    top: 0,
    left: "-35.714%",
    position: "absolute",
    paddingRight: 20
  },
  DatePublication: {
    width: "90%",
    borderTopColor: "#DBDBDB",
    borderTopWidth: 1,
    // borderTopStyle: "solid",
    paddingTop: 6,
    paddingBottom: 6
  },
  Byline: {
    width: "90%",
    borderTopColor: "#DBDBDB",
    borderTopWidth: 1,
    // borderTopStyle: "solid",
    paddingTop: 6,
    paddingBottom: 6
  },
  ArticleContent: {
    flex: 3,
    flexDirection: "column"
  },
  ArticleAd: {
    borderBottomWidth: 1,
    // borderBottomStyle: "solid",
    paddingBottom: 15,
    paddingTop: 15,
    // boxSizing: "border-box",
    borderBottomColor: "#DBDBDB"
  },
  ArticleMedia: {
    backgroundColor: "#EFEFEF"
  },
  ArticleCaption: {}
});
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class ArticlePage extends React.Component {
  // constructor (props) {
  //   super(props);
  //  }

  static genRows(props) {
    const Article = props.data.article;
    const ArticleHeader = pick(Article, [
      "id",
      "title",
      "publicationName",
      "label"
    ]);
    const ArticleMidContainer = pick(Article, [
      "publicationName",
      "publishedTime",
      "leadAsset"
    ]);
    const ArticleArray = Array.prototype.concat(
      [
        { type: "header", data: ArticleHeader },
        { type: "middleContaner", data: ArticleMidContainer }
      ],
      multiParagraph.map(i => ({ type: "article_body_row", data: i }))
    );
    return ArticleArray;
  }

  static renderRow(rowData) {
    if (rowData.type === "header") {
      return (
        <View style={styles.ArticleHeader}>
          {rowData.data.label
            ? <View style={styles.ArticleLabel}>
                <ArticleLabel title={rowData.data.label} color="#008347" />
              </View>
            : null}
          <View style={styles.ArticleHeadline}>
            <ArticleHeadline
              title={rowData.data.title}
              style={{ fontSize: 45, lineHeight: 45, color: "#333333" }}
            />
          </View>
          <View style={styles.ArticleFlag}>
            <NewArticleFlag />
          </View>
        </View>
      );
    } else if (rowData.type === "middleContaner") {
      const leadAssetUrl =
        "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F26cb2178-868c-11e7-9f10-c918952dd8f2.jpg?crop=1322%2C743%2C260%2C319&resize=685";
      return (
        <View style={styles.ArticleMiddleContainer}>
          <View style={styles.ArticleMeta}>
            <View style={styles.Byline}>
              <Text
                style={{
                  fontFamily: "GillSansMTStd-Medium",
                  fontSize: 13,
                  color: "#696969"
                }}
              >
                Francis Elliott Political Editor Philip Aldrick Economics Editor
                {" "}
              </Text>
            </View>
            <View style={styles.DatePublication}>
              <DatePublication
                date={new Date(rowData.data.publishedTime)}
                publication={rowData.data.publicationName}
              />
            </View>
          </View>
          <View style={styles.ArticleContent}>
            <View style={styles.LeadAsset}>
              <View style={styles.ArticleMedia}>
                {/* <Image source={{ uri: `http:${rowData.data.leadAsset.crop.url}` }} /> */}
                <Image source={{ uri: leadAssetUrl }} />
              </View>
              <View>
                {/* <Caption
                    text={rowData.data.leadAsset.caption}
                    credits={rowData.data.leadAsset.credits}
                  /> */}
              </View>
            </View>
          </View>
        </View>
      );
    } else if (rowData.type === "article_body_row") {
      return (
        //   <View style={styles.ArticleBody}>
        //     <View style={styles.ArticleContent}>
        <View style={{ marginBottom: 1.7 }}>
          <Markup ast={[rowData.data]} />
        </View>
        //     </View>
        //   </View>
      );
    }

    return <Text> Unknown type </Text>;
  }

  render() {
    if (this.props.data.loading) {
      return <Text>Loading ....</Text>;
    }

    this.state = {
      dataSource: ds.cloneWithRows(ArticlePage.genRows(this.props))
    };
    return (
      <View>
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
  // code: PropTypes.string,
  data: PropTypes.shape({
    article: PropTypes.object,
    loading: PropTypes.boolean
  })
};

ArticlePage.defaultProps = {
  // code: "intervention",
  id: "",
  data: {
    loading: true,
    article: {
      title:
        "Labour MPs urge Jeremy Corbyn to condemn Maduro’s Venezuela regime"
    }
  }
};

export default ArticlePage;
