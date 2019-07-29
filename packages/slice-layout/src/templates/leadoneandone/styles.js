import { spacing, colours } from "@times-components/styleguide";

const styles = {
  container: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: spacing(6)
  },
  leadItem: {
    width: "75%"
  },
  keyline: {
    backgroundColor: colours.functional.keyline,
    height: 1
  },
  supportItem: {
    width: "25%"
  },
  colSeparatorStyle: {
    marginVertical: spacing(3)
  }
};

export default styles;
