import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";

const styles = StyleSheet.create({
  container: {
    paddingTop: 0
  },
  inlineCaption: {
    paddingLeft: spacing(2),
    paddingTop: 0,
    width: "50%"
  },
  inlineContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingBottom: spacing(5),
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    width: "100%"
  },
  inlineImage: {
    width: "50%"
  },
  primaryContainer: {
    flexDirection: "column",
    paddingBottom: spacing(5),
    width: "100%"
  },
  secondaryCaption: {
    paddingLeft: spacing(2),
    paddingTop: 0,
    width: "50%"
  },
  secondaryContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingBottom: spacing(5),
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    width: "100%"
  },
  secondaryImage: {
    width: "50%"
  }
});

export default styles;
