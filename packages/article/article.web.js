import React from "react";
import { Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Ad, { AdComposer } from "@times-components/ad";
import { NewArticleFlag } from "@times-components/article-flag";
import ArticleLabel from "@times-components/article-label";
import ArticleHeadline from "@times-components/article-headline";
import DatePublication from "@times-components/date-publication";
import Image from "@times-components/image";
import Caption from "@times-components/caption";
import { builder } from "@times-components/markup";

const multiParagraph = require("./fixtures/multi-para.json").fixture;

const Article = props => {
  const data = props.data;
  if (data.loading) {
    return <Text>Loading</Text>;
  }

  const styles = StyleSheet.create({
    ArticleContainer: {
      flexDirection: "column"
    },
    LeadAsset: {
      position: "relative",
      boxSizing: "border-box",
      margin: 0,
      border: 0
      // paddingBottom: 25
    },
    ArticleBody: {
      flexDirection: "row",
      width: "58.33%",
      marginTop: 0,
      marginRight: "auto",
      marginBottom: 0,
      marginLeft: "auto"
    },
    ArticleBodyChildContainer: {
      boxSizing: "border-box"
    },
    ArticleHeader: {
      width: "58.33333%",
      margin: "auto",
      paddingTop: 15
    },
    ArticleHeadline: {
      paddingTop: 20,
      marginBottom: "0.6%"
    },
    ArticleFlag: {
      marginBottom: 28
    },
    ArticleLabel: {
      marginBottom: -25,
      boxSizing: "border-box",
      paddingBottom: 7
    },
    ArticleMeta: {
      flex: 1,
      width: "35.71429%",
      marginLeft: 15,
      boxSizing: "border-box",
      top: 0,
      left: "-35.714%",
      position: "absolute"
    },
    DatePublication: {
      width: "90%",
      borderTopColor: "#DBDBDB",
      borderTopWidth: 1,
      borderTopStyle: "solid",
      paddingTop: 5
    },
    Byline: {
      width: "90%",
      borderTopColor: "#DBDBDB",
      borderTopWidth: 1,
      borderTopStyle: "solid",
      paddingTop: 5,
      marginBottom: 3,
      marginTop: 2
    },
    ArticleContent: {
      flex: 3,
      flexDirection: "column"
    },
    ArticleAd: {
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      paddingBottom: 15,
      paddingTop: 15,
      boxSizing: "border-box",
      borderBottomColor: "#DBDBDB"
    },
    ArticleMedia: {
      // height: "58.25%",
      backgroundColor: "#EFEFEF"
    },
    ArticleCaption: {}
  });

  return (
    <View style={styles.ArticleContainer}>
      <View style={styles.ArticleAd}>
        <View style={{ alignSelf: "center" }}>
          <AdComposer section="article" networkId="25436805">
            <Ad code="intervention" />
          </AdComposer>
        </View>
      </View>
      <View style={styles.ArticleHeader}>
        <View style={styles.ArticleLabel}>
          <ArticleLabel title="health" color="#008347" />
        </View>
        <View style={styles.ArticleHeadline}>
          <ArticleHeadline
            title={data.article.title}
            style={{ fontSize: 45, lineHeight: 45, color: "#333333" }}
          />
        </View>
        <View style={styles.ArticleFlag}>
          <NewArticleFlag />
        </View>
      </View>
      <View style={styles.ArticleBody}>
        <View style={styles.ArticleMeta}>
          <View style={styles.Byline}>
            <Text
              style={{
                fontFamily: "GillSansMTStd-Medium",
                fontSize: 13,
                color: "#696969"
              }}
            >
              Patrick Kidd
              {" "}
            </Text>
          </View>
          <View style={styles.DatePublication}>
            <DatePublication
              date={data.article.publishedTime}
              publication={data.article.publicationName}
            />
          </View>
        </View>
        <View style={styles.ArticleContent}>
          <View style={styles.LeadAsset}>
            <View style={styles.ArticleMedia}>
              <Image
                style={{ height: 349 }}
                resizeMode={"center"}
                source={data.article.leadAsset.crop.url}
              />
            </View>
            <View>
              <Caption text="A recurring character in his novels is the Librarian of Unseen University" />
            </View>
          </View>
          <View>
            {builder({ ast: multiParagraph }).map(el =>
              <View style={{ marginBottom: 4 }}>
                {React.cloneElement(el, {
                  style: {
                    fontFamily: "TimesDigital-Regular",
                    lineHeight: 1.6,
                    fontSize: 18,
                    color: "#333"
                  }
                })}
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

Article.propTypes = {
  // code: PropTypes.string,
  data: PropTypes.shape({
    article: PropTypes.object,
    loading: PropTypes.boolean
  })
};

Article.defaultProps = {
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

export default Article;
