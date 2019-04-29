import { spacing, colours } from "@times-components/styleguide";

const styles = {
  container: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: spacing(2)
  },
  leadItem: {
    width: "80%"
  },
  keyline: {
    backgroundColor: colours.functional.keyline,
    height: 1
  },
  supportItem: {
    width: "20%"
  }
};

export default styles;
