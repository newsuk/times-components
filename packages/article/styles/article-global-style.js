import { StyleSheet } from "react-native";

const borderColor = "#d0cece";
const borderWidth = StyleSheet.hairlineWidth;

const globalStyle = StyleSheet.create({
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
  }
});

export default globalStyle;
