import {spacing} from "@times-components/styleguide";

const sharedStyle = {
  body: {
    display: "flex",
    flexDirection: "row",
    borderColor: "rgb(219, 219, 219)",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    height: spacing(11),
    marginTop: spacing(10),
    marginBottom: spacing(4),
    justifyContent: "space-between",
    alignItems: "center"
  },
  group: {
    display: "flex",
    flexDirection: "row",
    height: spacing(4),
    alignItems: "center"
  },
  text: {
    marginRight: spacing(1)
  },
  bubble: {
    display: "flex",
    boxSizing: "border-box",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderColor: "rgb(219, 219, 219)",
    borderWidth: 1,
    marginLeft: spacing(1),
    borderRadius: spacing(5),
    padding: spacing(2),
    height: spacing(8),
    width: spacing(8),
  }
};

export default sharedStyle;
