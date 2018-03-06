import { StyleSheet } from "react-native";
import { colours } from "@times-components/styleguide";

export default {
  container: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    marginBottom: 10,
    marginTop: 10
  },
  childContainer: {
    borderStyle: "solid",
    borderBottomColor: colours.functional.keyline,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "100%"
  },
  child: {
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    width: "100%"
  }
};
