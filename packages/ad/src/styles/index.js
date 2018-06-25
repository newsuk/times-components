import { StyleSheet } from "react-native";
import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

const styles = StyleSheet.create({
  children: {
    flex: 1
  },
  placeholderContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  placeholderWrapper: {
    alignItems: "center",
    backgroundColor: colours.functional.backgroundPrimary,
    borderColor: colours.functional.keyline,
    borderStyle: "solid",
    borderWidth: 1,
    justifyContent: "center",
    overflow: "hidden"
  },
  watermarkContainer: {
    left: 0,
    position: "absolute",
    top: 0
  },
  placeholderText: {
    backgroundColor: colours.functional.backgroundPrimary,
    borderColor: colours.functional.keyline,
    borderStyle: "solid",
    borderWidth: 1,
    color: colours.functional.secondary,
    fontFamily: fonts.body,
    fontSize: fontSizes.puffLink,
    letterSpacing: 1.5,
    paddingBottom: spacing(1),
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    paddingTop: spacing(1),
    zIndex: 1
  }
});

export default styles;
