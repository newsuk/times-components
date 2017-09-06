import { StyleSheet, Platform } from "react-native";

const globalStyle = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    flexBasis: "100%",
    justifyContent: "center"
  }
});

const webStyles = StyleSheet.create({
  ArticleMainContentRow: {
    paddingLeft: 10,
    paddingRight: 10
  },
  ArticleMiddleContainer: {
    paddingTop: 9
  },
  ArticleLabel: {
    marginTop: 4,
    marginBottom: 3
  },
  ArticleHeadline: {
    marginBottom: 7
  },
  ArticleHeadLineText: {
    fontSize: 30,
    lineHeight: 32,
    color: "#000000",
    marginBottom: 0
  },
  StandFirst: {
    fontSize: 21,
    lineHeight: 23,
    fontFamily: "TimesModern-Regular",
    paddingBottom: 9
  },
  ArticleFlag: {
    marginBottom: 11,
    flexDirection: "row"
  },
  ArticleFlagContainer: {
    marginRight: 14
  },
  ArticleMeta: {
    marginBottom: 20,
    borderBottomColor: "#d0cece",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  ArticleMetaElement: {
    borderTopColor: "#d0cece",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 6,
    paddingBottom: 1
  },
  LeadAsset: {
    marginBottom: 6
  },
  CaptionWrapper: {
    paddingLeft: 10,
    paddingRight: 10
  },
  ArticleTextElement: {
    fontFamily: "TimesDigitalW04",
    lineHeight: 1.53,
    fontSize: 17,
    marginBottom: 25,
    marginTop: 0,
    color: "#333"
  }
});

const nativeStyles = StyleSheet.create({
  PageWrapper: {
    paddingBottom: 66
  },
  ArticleMainContentRow: {
    paddingLeft: 10,
    paddingRight: 10
  },
  ArticleMiddleContainer: {
    paddingTop: 9
  },
  ArticleLabel: {
    paddingTop: 4,
    paddingBottom: 3
  },
  ArticleHeadline: {
    paddingBottom: 7
  },
  ArticleHeadLineText: {
    fontSize: 30,
    lineHeight: 32,
    color: "#000000",
    marginBottom: 0
  },
  StandFirst: {
    fontSize: 21,
    lineHeight: 23,
    fontFamily: "TimesModern-Regular",
    paddingBottom: 9
  },
  ArticleFlag: {
    marginBottom: 11,
    flexDirection: "row"
  },
  ArticleFlagContainer: {
    marginRight: 14
  },
  ArticleMeta: {
    marginBottom: 20,
    borderBottomColor: "#d0cece",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  ArticleMetaElement: {
    borderTopColor: "#d0cece",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 6
  },
  LeadAsset: {
    marginBottom: 6
  },
  ArticleTextWrapper: {
    marginBottom: 20
  },
  ArticleTextElement: {
    fontFamily: "TimesDigitalW04",
    fontStyle: "normal",
    lineHeight: 20,
    fontSize: 18,
    color: "#333"
  }
});

const styles = {};

if (Platform.OS !== "web") {
  Object.assign(styles, globalStyle, nativeStyles);
} else {
  Object.assign(styles, globalStyle, webStyles);
}

export default styles;
