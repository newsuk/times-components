import { StyleSheet } from "react-native";
import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

const styles = StyleSheet.create({
  bullet: {
    backgroundColor: colours.functional.bullet,
    height: 8,
    top: 1,
    transform: [{ rotate: "45deg" }],
    width: 8
  },
  container: {
    flexDirection: "row",
    marginBottom: spacing(4),
    paddingLeft: 1,
    width: "100%"
  },
  text: {
    color: colours.functional.primary,
    fontFamily: fonts.body,
    fontSize: fontSizes.secondary,
    lineHeight: 30,
    marginTop: -8,
    paddingLeft: spacing(3)
  },
  title: {
    fontFamily: fonts.supporting,
    fontSize: fontSizes.cardMetaMobile,
    fontWeight: "400",
    letterSpacing: 1.2,
    marginBottom: 20
  }
});

export default styles;
