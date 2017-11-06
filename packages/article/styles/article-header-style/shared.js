import { StyleSheet } from "react-native";
import constants from "../const";

const { fontFamilyStandFirst, colourHeadline, colourText } = constants;

const sharedStyles = StyleSheet.create({
  articleHeadLineText: {
    fontSize: 30,
    lineHeight: 32,
    color: colourHeadline,
    marginBottom: 7
  },
  standFirst: {
    fontSize: 21,
    lineHeight: 26,
    fontFamily: fontFamilyStandFirst,
    color: colourText,
    paddingBottom: 9
  }
});

export default sharedStyles;
