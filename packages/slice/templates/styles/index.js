import { StyleSheet } from "react-native";
import { colours, spacing } from "@times-components/styleguide";

const styles = {
  itemContainer: {
    borderStyle: "solid",
    borderBottomColor: colours.functional.keyline,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "100%"
  },
  item: {
    paddingBottom: 2 * spacing,
    paddingLeft: 2 * spacing,
    paddingRight: 2 * spacing,
    paddingTop: 2 * spacing,
    width: "100%"
  }
};

export default styles;
