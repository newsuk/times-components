import { StyleSheet } from "react-native";
import { colours } from "@times-components/styleguide";

const styles = {
  itemContainer: {
    borderBottomColor: colours.functional.keyline,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderStyle: "solid",
    width: "100%"
  },
  item: {
    width: "100%"
  }
};

export default styles;
