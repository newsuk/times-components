import { StyleSheet, Platform } from "react-native";

const standFirstFontFamily = "TimesModern-Regular";
const bodyFontFamilyWebIos = "TimesDigitalW04";
const bodyFontFamilyAndroid = "TimesDigitalW04-Regular";
const borderColor = "#d0cece";
const borderWidth = StyleSheet.hairlineWidth;

const globalStyle = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    flexBasis: "100%",
    justifyContent: "center"
  }
});

const webStyles = StyleSheet.create({
  articleMainContentRow: {
    paddingLeft: 10,
    paddingRight: 10
  },
  articleMiddleContainer: {
    paddingTop: 9
  },
  articleLabel: {
    marginTop: 4,
    marginBottom: 3
  },
  articleHeadline: {
    marginBottom: 7
  },
  articleHeadLineText: {
    fontSize: 30,
    lineHeight: 32,
    color: "#000000",
    marginBottom: 0
  },
  standFirst: {
    fontSize: 21,
    lineHeight: 26,
    fontFamily: standFirstFontFamily,
    color: "#333333",
    paddingBottom: 9
  },
  articleFlag: {
    marginBottom: 11,
    flexDirection: "row"
  },
  articleFlagContainer: {
    marginRight: 14
  },
  articleMeta: {
    marginBottom: 20,
    borderBottomColor: borderColor,
    borderBottomWidth: borderWidth
  },
  articleMetaElement: {
    borderTopColor: borderColor,
    borderTopWidth: borderWidth,
    paddingTop: 9,
    paddingBottom: 5
  },
  leadAsset: {
    marginBottom: 10
  },
  captionWrapper: {
    paddingLeft: 10,
    paddingRight: 10
  },
  articleTextElement: {
    fontFamily: bodyFontFamilyWebIos,
    lineHeight: 1.53,
    fontSize: 17,
    marginBottom: 25,
    marginTop: 0,
    color: "#333"
  }
});

const nativeStyles = StyleSheet.create({
  articleMainContentRow: {
    paddingLeft: 10,
    paddingRight: 10
  },
  articleMiddleContainer: {
    paddingTop: 9
  },
  articleLabel: {
    paddingTop: 4,
    paddingBottom: 3
  },
  articleHeadline: {
    paddingBottom: 7
  },
  articleHeadLineText: {
    fontSize: Platform.OS === "android" ? 28 : 30,
    lineHeight: Platform.OS === "android" ? 37 : 32,
    color: "#000000",
    fontWeight: Platform.OS === "android" ? "400" : "700",
    marginBottom: 0
  },
  standFirst: {
    fontSize: 21,
    lineHeight: Platform.OS === "android" ? 29 : 25,
    color: "#333333",
    fontFamily: standFirstFontFamily,
    paddingBottom: 9
  },
  articleFlag: {
    marginBottom: 11,
    flexDirection: "row"
  },
  articleFlagContainer: {
    marginRight: 14
  },
  articleMeta: {
    marginBottom: 20,
    borderBottomColor: borderColor,
    borderBottomWidth: borderWidth
  },
  articleMetaElement: {
    borderTopColor: borderColor,
    borderTopWidth: borderWidth,
    paddingTop: Platform.OS === "android" ? 6 : 9,
    paddingBottom: Platform.OS === "android" ? 8 : 4
  },
  leadAsset: {
    marginBottom: Platform.OS === "android" ? 6 : 10
  },
  articleTextWrapper: {
    marginBottom: 20
  },
  articleTextElement: {
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
