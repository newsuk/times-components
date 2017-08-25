import { StyleSheet, Platform } from "react-native";

const globalStyle = StyleSheet.create({});

const webStyles = StyleSheet.create({
  // ArticleAd: {
  //   borderBottomWidth: 1,
  //   paddingBottom: 15,
  //   paddingTop: 15,
  //   borderBottomColor: "#DBDBDB"
  // },
  ArticleMainContentRow: {
    paddingLeft: 10,
    paddingRight: 10
  },
  ArticleMiddleContainer: {
    marginTop: 19.5
  },
  ArticleHeader: {
    // paddingTop: 15
  },
  ArticleHeadline: {
    marginBottom: 15
  },
  ArticleHeadLineText: {
    fontSize: 30,
    lineHeight: 32,
    color: "#333333",
    marginTop: 3,
    marginBottom: 0
  },
  StandFirst: {
    fontSize: 21,
    lineHeight: 23,
    fontFamily: "TimesModern-Regular",
    paddingBottom: 14
  },
  ArticleFlag: {
    marginBottom: 3,
    flexDirection: "row"
  },
  ArticleFlagContainer: {
    marginRight: 14
  },
  ArticleMeta: {
    marginBottom: 10
  },
  ArticleMetaElement: {
    borderTopColor: "#d0cece",
    borderTopWidth: 1,
    paddingTop: 5,
    paddingBottom: 6
  },
  LeadAsset: {
    marginBottom: 10
  },
  CaptionWrapper: {
    paddingLeft: 10,
    paddingRight: 10
  },
  ArticleTextElement: {
    fontFamily: "TimesDigitalW04-Regular",
    lineHeight: 1.53,
    fontSize: 17,
    // reset the default p style just for the web (on the native we have <Text> element with no default style)
    marginBottom: 25,
    marginTop: 0,
    color: "#333"
  }
});

const nativeStyles = StyleSheet.create({
  PageWrapper: {
    paddingBottom: 66
  },
  // ArticleAd: {
  //   borderBottomWidth: 1,
  //   paddingBottom: 15,
  //   paddingTop: 15,
  //   borderBottomColor: "#DBDBDB"
  // },
  ArticleMainContentRow: {
    paddingLeft: 10,
    paddingRight: 10
  },
  ArticleMiddleContainer: {
    marginTop: 19.5
  },
  ArticleHeader: {
    // paddingTop: 15
  },
  ArticleHeadline: {
    marginBottom: 15
  },
  ArticleHeadLineText: {
    fontSize: 30,
    lineHeight: 32,
    color: "#333333",
    marginTop: 3,
    marginBottom: 0
  },
  StandFirst: {
    fontSize: 21,
    lineHeight: 23,
    fontFamily: "TimesModern-Regular",
    paddingBottom: 14
  },
  ArticleFlag: {
    marginBottom: 3,
    flexDirection: "row"
  },
  ArticleFlagContainer: {
    marginRight: 14
  },
  ArticleMeta: {
    marginBottom: 10
  },
  ArticleMetaElement: {
    borderTopColor: "#d0cece",
    borderTopWidth: 1,
    paddingTop: 5,
    paddingBottom: 6
  },
  LeadAsset: {
    marginBottom: 10
  },
  ArticleText: {
    // color: "#333"
  },
  ArticleTextWrapper: {
    marginBottom: 20
    // backgroundColor: "yellow"
  },
  ArticleTextElement: {
    fontFamily: "TimesDigitalW04-Regular",
    lineHeight: 20,
    fontSize: 18,
    color: "#333"
  }
});

const styles = {};

if (Platform.OS === "android" || Platform.OS === "ios") {
  Object.assign(styles, globalStyle, nativeStyles);
} else {
  Object.assign(styles, globalStyle, webStyles);
}

export default styles;
