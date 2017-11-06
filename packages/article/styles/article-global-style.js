import { StyleSheet } from "react-native";
import { COLOUR_BORDER } from "./const";

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
    borderBottomColor: COLOUR_BORDER,
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});

export default globalStyle;
