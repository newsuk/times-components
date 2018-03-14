import { StyleSheet } from "react-native";
import { colours } from "@times-components/styleguide";

const styles = {
  container: {
    marginBottom: 10,
    marginTop: 10
  },
  itemContainer: {
    borderStyle: "solid",
    borderBottomColor: colours.functional.keyline,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "100%"
  },
  item: {
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    width: "100%"
  }
};

export default styles;
