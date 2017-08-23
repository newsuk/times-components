import { StyleSheet, Platform } from "react-native";

const webStyles = StyleSheet.create({
  ArticleContainer: {
    paddingLeft: 20,
    paddingRight: 20
  },
  ArticleAd: {
    marginLeft: -20,
    marginRight: -20,
    borderBottomWidth: 1,
    paddingBottom: 15,
    paddingTop: 15,
    borderBottomColor: "#DBDBDB"
  },
  ArticleBodyContainer: {
    width: "58.33333%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  ArticleMiddleContainer: {
    marginTop: 30
  },
  ArticleHeader: {
    paddingTop: 15
  },
  ArticleHeadline: {
    marginBottom: 15
  },
  ArticleHeadLineText: {
    fontSize: 45,
    lineHeight: 45,
    color: "#333333",
    marginBottom: 0
  },
  ArticleFlag: {
    marginTop: 6,
    marginBottom: 3
  },
  ArticleFlagContainer: {},
  ArticleMeta: {
    marginBottom: 20,
    paddingRight: 20,
    width: "35.71429%",
    left: "-35.71429%",
    position: "absolute"
  },
  ArticleMetaElement: {
    borderTopColor: "#DBDBDB",
    borderTopWidth: 1,
    paddingTop: 6,
    paddingBottom: 6
  },
  LeadAsset: {
    marginBottom: 30
  },
  ArticleTextWrapper: {
    // backgroundColor: "red"
  },
  ArticleTextElement: {
    fontFamily: "TimesDigital-Regular",
    lineHeight: 1.7,
    fontSize: 18,
    color: "#333",
    marginTop: 0,
    marginBottom: 30
  }
});

const nativeStyles = StyleSheet.create({
  ArticleAd: {
    borderBottomWidth: 1,
    paddingBottom: 15,
    paddingTop: 15,
    borderBottomColor: "#DBDBDB"
  },
  ArticleBodyContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  ArticleHeader: {
    paddingTop: 15
  },
  ArticleHeadline: {
    marginBottom: 15
  },
  ArticleHeadLineText: {
    fontSize: 45,
    lineHeight: 45,
    color: "#333333",
    marginBottom: 0
  },
  ArticleFlag: {
    marginTop: 6,
    marginBottom: 3
  },
  ArticleFlagContainer: {},
  ArticleMeta: {
    marginBottom: 10
  },
  ArticleMetaElement: {
    borderTopColor: "#DBDBDB",
    borderTopWidth: 1,
    paddingTop: 6,
    paddingBottom: 6
  },
  LeadAsset: {
    marginBottom: 20
  },
  ArticleText: {
    // color: "#333"
  },
  ArticleTextWrapper: {
    marginBottom: 1.7
  },
  ArticleTextElement: {
    fontFamily: "TimesDigital-Regular",
    lineHeight: 10,
    fontSize: 18,
    color: "#333"
  }
});

const styles = {};

if (Platform.OS === "android" || Platform.OS === "ios") {
  Object.assign(styles, nativeStyles);
} else {
  Object.assign(styles, webStyles);
}

export default styles;
