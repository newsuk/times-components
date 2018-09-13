import { StyleSheet } from "react-native";
import {
  colours,
  fonts,
  fontFactory,
  spacing
} from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  heading: {
    color: colours.functional.contrast,
    ...fontFactory({
      font: "headline",
      fontSize: "infoTitle"
    }),
    textAlign: "center",
    width: "auto",
    height: "auto",
    marginBottom: spacing(2)
  },
  body: {
    fontFamily: fonts.body,
    textAlign: "center",
    color: colours.functional.contrast,
    ...fontFactory({
      font: "supporting",
      fontSize: "secondary"
    }),
    lineHeight: 25,
    opacity: 0.7,
    height: "auto",
    maxWidth: 285
  },
  background: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 1)"
  },
  textContainer: {
    position: "absolute",
    maxWidth: "80%"
  },
  posterContainer: {
    filter: "blur(8px)",
    opacity: 0.2,
    width: "100%",
    height: "100%"
  },
  posterImage: {
    position: "absolute",
    overflow: "hidden",
    width: "100%",
    height: "100%"
  }
});

const retryButtonStyles = {
  alignSelf: "center",
  marginTop: spacing(3),
  maxWidth: 107,
  height: 36,
  border: 0
};

export { retryButtonStyles };
export default styles;
