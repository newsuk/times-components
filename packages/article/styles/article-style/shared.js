import { StyleSheet } from "react-native";
import constants from "../const";

const { fontFamilyBody, colourText } = constants;

const sharedStyles = StyleSheet.create({
  leadAsset: {
    marginBottom: 10
  },
  articleTextElement: {
    fontFamily: fontFamilyBody,
    lineHeight: 26,
    fontSize: 17,
    marginBottom: 25,
    color: colourText
  }
});

export default sharedStyles;
