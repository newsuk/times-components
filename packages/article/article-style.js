import { StyleSheet, Platform } from "react-native";

const standFirstFontFamily = "TimesModern-Regular";
const bodyFontFamilyWebIos = "TimesDigitalW04";
const bodyFontFamilyAndroid = "TimesDigitalW04-Regular";
const borderColor = "#d0cece";
const borderWidth = StyleSheet.hairlineWidth;

const globalStyle = StyleSheet.create({
  Container: {
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
    fontFamily: standFirstFontFamily,
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
    borderBottomColor: borderColor,
    borderBottomWidth: borderWidth
  },
  ArticleMetaElement: {
    borderTopColor: borderColor,
    borderTopWidth: borderWidth,
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
    fontFamily: bodyFontFamilyWebIos,
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
    fontFamily: standFirstFontFamily,
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
    borderBottomColor: borderColor,
    borderBottomWidth: borderWidth
  },
  ArticleMetaElement: {
    borderTopColor: borderColor,
    borderTopWidth: borderWidth,
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
      Platform.OS === "android" ? bodyFontFamilyAndroid : bodyFontFamilyWebIos,
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
