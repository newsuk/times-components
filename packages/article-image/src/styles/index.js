import { StyleSheet } from "react-native";
import {
  spacing,
  tabletRowPadding,
  tabletWidth,
  tabletWidthMax
} from "@times-components/styleguide";

const containerShared = {
  alignSelf: "center",
  width: tabletWidth - tabletRowPadding
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 0
  },
  fullwidthCaption: {
    alignSelf: "center",
    maxWidth: tabletWidth - tabletRowPadding
  },
  fullwidthContainer: {
    marginBottom: spacing(2),
    maxWidth: tabletWidthMax
  },
  inlineCaption: {
    paddingLeft: spacing(2),
    paddingTop: 0
  },
  inlineContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingBottom: spacing(5),
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    width: "100%"
  },
  inlineContainerTablet: {
    ...containerShared,
    flexDirection: "column",
    marginTop: 0,
    paddingBottom: 0,
    paddingLeft: spacing(0),
    paddingTop: 0,
    width: "100%"
  },
  inlineImage: {
    width: "100%"
  },
  primaryContainer: {
    flexDirection: "column",
    paddingBottom: spacing(3),
    width: "100%"
  },
  primaryContainerTablet: {
    ...containerShared
  },
  secondaryCaption: {
    paddingLeft: spacing(2),
    paddingTop: 0,
    width: "50%"
  },
  secondaryContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingBottom: spacing(4),
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    width: "100%"
  },
  secondaryContainerTablet: {
    ...containerShared,
    paddingLeft: spacing(0),
    paddingRight: spacing(0)
  },
  secondaryImage: {
    width: "50%"
  }
});

export default styles;
