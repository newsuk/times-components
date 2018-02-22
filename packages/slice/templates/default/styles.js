import { StyleSheet } from "react-native";

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
    borderBottomColor: "#dbdbdb",
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
