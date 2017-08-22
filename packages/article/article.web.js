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
  const code = props.code;

  if (data.loading) {
    return <Text>Loading</Text>;
  }

  const styles = StyleSheet.create({
    Container: {},
    ArticleContainer: {
      flexDirection: "column",
      boxSizing: "border-box",
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 15
    },
    LeadAsset: {
      position: "relative",
      boxSizing: "border-box",
      marginBottom: 30
    },
    ArticleMiddleContainer: {
      flexDirection: "row",
      width: "58.33%",
      marginTop: 30,
      marginRight: "auto",
      marginBottom: 0,
      marginLeft: "auto"
    },
    ArticleBody: {
      flexDirection: "row",
      width: "58.33%",
      marginRight: "auto",
      marginBottom: 0,
      marginLeft: "auto"
    },
    ArticleBodyChildContainer: {
      boxSizing: "border-box"
    },
    ArticleHeader: {
      width: "58.33333%",
      margin: "auto"
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
      boxSizing: "border-box",
      top: 0,
      left: "-35.714%",
      position: "absolute",
      paddingRight: 20
    },
    DatePublication: {
      width: "90%",
      borderTopColor: "#DBDBDB",
      borderTopWidth: 1,
      borderTopStyle: "solid",
      paddingTop: 6,
      paddingBottom: 6
    },
    Byline: {
      width: "90%",
      borderTopColor: "#DBDBDB",
      borderTopWidth: 1,
      borderTopStyle: "solid",
      paddingTop: 6,
      paddingBottom: 6
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
      backgroundColor: "#EFEFEF"
    },
    ArticleCaption: {}
  });

  return (
    <View style={styles.Container}>
      <View style={styles.ArticleAd}>
        <View style={{ alignSelf: "center" }}>
          <AdComposer section="article" networkId="25436805">
            <Ad code={code} />
          </AdComposer>
        </View>
      </View>
      <View style={styles.ArticleContainer}>
        <View style={styles.ArticleHeader}>
          {data.article.label
            ? <View style={styles.ArticleLabel}>
                <ArticleLabel title={data.article.label} color="#008347" />
              </View>
            : null}
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
                date={data.article.publishedTime}
                publication={data.article.publicationName}
              />
            </View>
          </View>
          <View style={styles.ArticleContent}>
            <View style={styles.LeadAsset}>
              <View style={styles.ArticleMedia}>
                <Image source={{ uri: data.article.leadAsset.crop.url }} />
              </View>
              <View>
                <Caption
                  text={data.article.leadAsset.caption}
                  credits={data.article.leadAsset.credits}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.ArticleBody}>
          <View style={styles.ArticleContent}>
            <View>
              {builder({ ast: multiParagraph }).map(el =>
                <View style={{ marginBottom: 1.7 }}>
                  {React.cloneElement(el, {
                    style: {
                      fontFamily: "TimesDigital-Regular",
                      lineHeight: 1.7,
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
    </View>
  );
};

Article.propTypes = {
  code: PropTypes.string,
  data: PropTypes.shape({
    article: PropTypes.object,
    loading: PropTypes.boolean
  })
};

Article.defaultProps = {
  code: "intervention",
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
