import { StyleSheet } from "react-native";
import styleguide from "@times-components/styleguide";
import sharedStyles from "./shared";

const { colours, spacing } = styleguide();
const styles = StyleSheet.create({
  ...sharedStyles,
  articleMeta: {
    borderBottomColor: colours.functional.keyline,
    borderBottomWidth: 1,
    marginLeft: spacing(2),
    marginRight: spacing(2),
    paddingBottom: spacing(2),
    marginBottom: spacing(4)
  },
  articleMetaElement: {
    ...sharedStyles.articleMetaElement,
    paddingTop: 0
  },
  byline: {
    ...sharedStyles.byline,
    lineHeight: 26
  },
  datePublication: {
    ...sharedStyles.datePublication,
    marginTop: 0,
    paddingTop: 0
  }
});

export default styles;
