import { StyleSheet } from "react-native";
import { colours, spacing } from "@times-components/styleguide";

const styles = {
  itemContainer: {
    borderBottomColor: colours.functional.keyline,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderStyle: "solid",
    width: "100%"
  },
  item: {
    paddingBottom: spacing(2),
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    paddingTop: spacing(2),
    width: "100%"
  }
};

export default styles;
