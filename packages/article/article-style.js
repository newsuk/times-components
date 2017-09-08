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
    lineHeight: 26,
    fontFamily: "TimesModern-Regular",
    color: "#333333",
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
    paddingTop: 9,
    paddingBottom: 5
  },
  LeadAsset: {
    marginBottom: 10
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
    fontSize: Platform.OS === "android" ? 28 : 30,
    lineHeight: Platform.OS === "android" ? 37 : 32,
    color: "#000000",
    fontWeight: Platform.OS === "android" ? "400" : "700",
    marginBottom: 0
  },
  StandFirst: {
    fontSize: 21,
    lineHeight: Platform.OS === "android" ? 29 : 25,
    color: "#333333",
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
    paddingTop: Platform.OS === "android" ? 6 : 9,
    paddingBottom: Platform.OS === "android" ? 8 : 4
  },
  LeadAsset: {
    marginBottom: Platform.OS === "android" ? 6 : 10
  },
  ArticleTextWrapper: {
    marginBottom: 20
  },
  ArticleTextElement: {
    fontFamily:
      Platform.OS === "android" ? "TimesDigitalW04-Regular" : "TimesDigitalW04",
    fontStyle: "normal",
    lineHeight: 26,
    fontSize: Platform.OS === "android" ? 16 : 17,
    color: "#333333"
  }
});

const styles = {};

if (Platform.OS !== "web") {
  Object.assign(styles, globalStyle, nativeStyles);
} else {
  Object.assign(styles, globalStyle, webStyles);
}

export default styles;
