import { StyleSheet } from "react-native";
import {
  COLOUR_HEADLINE,
  COLOUR_TEXT,
  FONT_FAMILY_STAND_FIRST
} from "../const";

const sharedStyles = StyleSheet.create({
  articleHeadLineText: {
    fontSize: 30,
    lineHeight: 32,
    color: COLOUR_HEADLINE,
    marginBottom: 7
  },
  standFirst: {
    fontSize: 21,
    lineHeight: 26,
    fontFamily: FONT_FAMILY_STAND_FIRST,
    color: COLOUR_TEXT,
    paddingBottom: 9
  }
});

export default sharedStyles;
