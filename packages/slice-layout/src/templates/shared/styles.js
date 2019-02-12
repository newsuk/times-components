import { colours, spacing } from "@times-components/styleguide";

const styles = {
  itemColSeparator: {
    borderColor: colours.functional.keyline,
    borderRightWidth: 1,
    borderStyle: "solid",
    marginVertical: spacing(2)
  },
  itemRowSeparator: {
    borderBottomColor: colours.functional.keyline,
    borderBottomWidth: 1,
    borderStyle: "solid",
    marginHorizontal: spacing(2)
  }
};

export default styles;
