import { Platform } from "react-native";

const sharedStyles = {
  leadAsset: {
    marginBottom: 10,
    ...Platform.select({
      web: {
        display: "block"
      },
      ios: {
        display: "flex"
      },
      android: {
        display: "flex"
      }
    })
  },
  articleTextElement: {
    fontFamily: "TimesDigitalW04",
    lineHeight: 26,
    fontSize: 17,
    marginBottom: 25,
    color: "#333333"
  },
  articleMainContentRow: {
    paddingLeft: 10,
    paddingRight: 10
  }
};

export default sharedStyles;
