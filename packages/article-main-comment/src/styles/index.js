import { StyleSheet } from "react-native";
import {
  spacing,
  colours,
  fonts,
  fontSizes
} from "@times-components/styleguide";
import sharedStyles from "./shared";

const nativeStyles = {
  ...sharedStyles,
  articleHeadline: {
    ...sharedStyles.articleHeadline,
    marginBottom: spacing(2.75)
  },
  authorImage: {
    ...sharedStyles.authorImage,
    marginBottom: spacing(3),
    borderRadius: 50,
    height: 100,
    overflow: "hidden",
    width: 100
  },
  standFirst: {
    ...sharedStyles.standFirst,
    lineHeight: 25
  },
  metaContainer: {
    ...sharedStyles.metaContainer,
    marginTop: spacing(1)
  },
  header: {
    ...sharedStyles.header,
    marginBottom: 0
  },
  bylineOpinion: {
    color: colours.section.comment,
    fontFamily: fonts.supporting,
    fontSize: fontSizes.cardMetaMobile,
    letterSpacing: 0.6,
    lineHeight: 12,
    textTransform: "uppercase",
    marginBottom: spacing(1)
  }
};

const styles = StyleSheet.create({
  ...nativeStyles
});

export default styles;
